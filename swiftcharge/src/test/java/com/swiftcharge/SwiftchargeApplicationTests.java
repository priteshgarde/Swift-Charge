package com.swiftcharge;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.orm.jpa.JpaSystemException;

import com.swiftcharge.entity.Booking;
import com.swiftcharge.entity.Station;
import com.swiftcharge.mapstruct.dto.requestDto.BookingDto;
import com.swiftcharge.mapstruct.dto.responseDto.BookingDetails;
import com.swiftcharge.mapstruct.dto.responseDto.ChargingPointDto;
import com.swiftcharge.mapstruct.dto.responseDto.ChargingPointSummary;
import com.swiftcharge.repository.BookingRepository;
import com.swiftcharge.service.BookingService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootTest
class SwiftchargeApplicationTests {

	@Autowired
	BookingService bs;
	
	@Autowired
	BookingRepository br;
	
	@Test
	void stationList() {
		BookingDto bdto = new BookingDto();
		bdto.setLattitude(27.23);
		bdto.setLongitude(21.24);
		bs.getNearbyStations(bdto);
	}
	
//	@Test
//	void availablePoints() {
//		for(ChargingPointSummary cp: br.getAvailableChargingPoints()) {
//			log.info(cp.getId());
//			log.info(cp.getStationId());
//		}
//	}
	
	@Test
	void lockSlot() {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		try {
			br.lockSlot("1005", LocalDateTime.parse("2022-03-31 15:00:00", formatter), 
					LocalDateTime.parse("2022-03-31 16:00:00", formatter), "1509442", "1509442003", "-707270771");
		} catch (JpaSystemException e) {
			// TODO Auto-generated catch block
//			log.info(e.getMessage());
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
	}
	@Test
	void bookingDetails() {
		BookingDetails bd = br.getBookingDetailsById("1000");
	}
}
