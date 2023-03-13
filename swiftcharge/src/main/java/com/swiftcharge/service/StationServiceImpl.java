package com.swiftcharge.service;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.swiftcharge.entity.ChargingPoint;
import com.swiftcharge.entity.Station;
import com.swiftcharge.exception.StationAlreadyExistsException;
import com.swiftcharge.mapstruct.dto.requestDto.StationUpdateDto;
import com.swiftcharge.mapstruct.dto.responseDto.StationDto;
import com.swiftcharge.mapstruct.dto.responseDto.StationSummary;
import com.swiftcharge.mapstruct.mapper.MapStructMapper;
import com.swiftcharge.repository.StationRepository;
import com.swiftcharge.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class StationServiceImpl implements StationService {

	@Autowired
	StationRepository stationRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	private MapStructMapper mapStructMapper;
	
	@Override
	public StationDto addNewStation(StationUpdateDto newStation) {
		System.out.println(newStation);
		if(stationRepository.findByRegistrationNumber(newStation.getRegistrationNumber()) != null)
			throw new StationAlreadyExistsException("Station with registration number "+ newStation.getRegistrationNumber()
			+ " already exists");
		Station station = mapStructMapper.StationUpdateDtoToStation(newStation);
		String stationId = String.valueOf(newStation.getRegistrationNumber().hashCode());
		station.setId(stationId);
		station.setApproved(false);
		station.getUser().getRole().setId(2);
		
		System.out.println("Total points:");
		System.out.println(station.getTotalPoints());
		
		Set<ChargingPoint> chargingPoints = new LinkedHashSet<ChargingPoint>();
		
		for(int i = 1, points = station.getTotalPoints(); i<= points; i++) {
			ChargingPoint cp = new ChargingPoint();
			cp.setId(stationId + String.format("%03d", i));
			cp.setStation(station);
			chargingPoints.add(cp);
		}
		System.out.println("created set " +chargingPoints);
		
		station.setChargingPoints(chargingPoints);
		System.out.println(station.getChargingPoints());
		
		userRepository.updateRole(station.getUser().getRole(), station.getUser().getId());
		
		return mapStructMapper.StationtoStationDto(stationRepository.save(station));

		}
	
	public List<StationDto> unapprovedStations(){
		return mapStructMapper.StationListToStationDtoList(stationRepository.findByIsApprovedFalse());
	}
	
	public void approveStation(String id) {
		stationRepository.approveStation(id);
		log.info("Approved Station " + id);
	}
}
