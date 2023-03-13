package com.swiftcharge.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.stereotype.Service;

import com.mysql.cj.log.Log;
import com.mysql.cj.x.protobuf.MysqlxCrud.Collection;
import com.swiftcharge.entity.Station;
import com.swiftcharge.exception.BookingSessionTimeOutException;
import com.swiftcharge.exception.NoSlotAvailableException;
import com.swiftcharge.mapstruct.dto.requestDto.BookingDto;
import com.swiftcharge.mapstruct.dto.requestDto.LockSlotDto;
import com.swiftcharge.mapstruct.dto.responseDto.BookingDetails;
import com.swiftcharge.mapstruct.dto.responseDto.ChargingPointDto;
import com.swiftcharge.mapstruct.dto.responseDto.ChargingPointSummary;
import com.swiftcharge.mapstruct.dto.responseDto.StationDto;
import com.swiftcharge.mapstruct.dto.responseDto.StationSummary;
import com.swiftcharge.mapstruct.mapper.MapStructMapper;
import com.swiftcharge.repository.BookingRepository;
import com.swiftcharge.repository.StationRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service

public class BookingServiceImpl implements BookingService {
	
	@Autowired
	BookingRepository bookingRepository;
	
	@Autowired
	StationRepository stationRepository;
	
	@Autowired
	private MapStructMapper mapStructMapper;
	
	
	private Map<String, Thread> threadMap = new HashMap<String, Thread>();

	@Override
	public List<StationDto> getNearbyStations(BookingDto bd) {
		double range = 0.05;
		List<StationSummary> stationSummary = stationRepository.findNearbyStations(
				bd.getLattitude() - range, bd.getLattitude() + range,
				bd.getLongitude() - range, bd.getLongitude() + range);
		List<StationDto> stations = mapStructMapper.StationSummaryListToStationDtoList(stationSummary);
		
		for(StationDto s: stations) {
			log.info(s.getId());
		}
		
		return stations;
	}
	
	@Override
	public java.util.Collection<StationDto> getAvailableSlots(BookingDto bd){
		List<StationDto> nearbyStations = getNearbyStations(bd);
		
		List<String> stationIds = nearbyStations.stream().map(StationDto::getId).collect(Collectors.toList());
				
		List<ChargingPointSummary> chargingPoints = bookingRepository.getAvailableChargingPoints(stationIds, bd.getStartTime(), bd.getEndTime() );
		
		Map<String, StationDto> stations = nearbyStations.stream()
			      .collect(Collectors.toMap(StationDto::getId, Function.identity()));
		
		for(ChargingPointSummary cp: chargingPoints) {
			stations.get(cp.getStationId()).getChargingPoints()
				.add(mapStructMapper.ChargingPointSummaryToChargingPointDto(cp));
		}
		
		return stations.values();
			
	}
	public String lockSlot(LockSlotDto lsd) {
		BookingDto bd = lsd.getBookingDto();
		StationDto station = lsd.getStation();
		String bookingId = null;
		
		for(ChargingPointDto cpd: station.getChargingPoints()) {
			bookingId = cpd.getId() + bd.getVehicle().getId() + bd.getStartTime();
			try {
				bookingRepository.lockSlot(bookingId, bd.getStartTime(), bd.getEndTime(), cpd.getStationId(), cpd.getId(), bd.getVehicle().getId());
				startTimeOut(bookingId);
				log.info("lock achieved " + cpd.getId());
				return bookingId;
			}catch(JpaSystemException  e) {
				log.info("failed to achieve lock on " + cpd.getId());
			}
		}
		throw new NoSlotAvailableException();
	}

	@Transactional
	private void startTimeOut(String bookingId) {
		Thread t = new Thread(()->{
			try {
				Thread.sleep(60000);
				bookingRepository.deleteById(bookingId);
				log.info("Booking failed for " + bookingId);
				threadMap.remove(bookingId);
			} catch (InterruptedException e) {
				log.info("Payement successful for " + bookingId);
			}
		});
		t.start();
		threadMap.put(bookingId, t);
	}
	
	@Transactional
	public BookingDetails confirmBooking(String id) {
		if(threadMap.containsKey(id)) {
			Thread t = threadMap.get(id);
			t.interrupt();
			bookingRepository.confirmBooking(id);
			return bookingRepository.getBookingDetailsById(id);
		}
		throw new BookingSessionTimeOutException("Session timed out, please try again");
	}
	
	public List<BookingDetails> getAllBookings(String userId){
		return bookingRepository.findAllBookingsByUserId(userId);
	}
	
	public List<BookingDetails> getAllBookingsForStation(String stationId){
		return bookingRepository.findAllBookingsByStationId(stationId);
	}
}
