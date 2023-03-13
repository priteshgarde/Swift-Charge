package com.swiftcharge.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.swiftcharge.mapstruct.dto.requestDto.BookingDto;
import com.swiftcharge.mapstruct.dto.requestDto.LockSlotDto;
import com.swiftcharge.mapstruct.dto.responseDto.BookingDetails;
import com.swiftcharge.mapstruct.dto.responseDto.StationDto;
import com.swiftcharge.repository.BookingRepository;
import com.swiftcharge.service.BookingService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin
public class BookingController {

	@Autowired
	BookingService bookingService;
	
	@PostMapping("/availablePoints")
	ResponseEntity<Collection<StationDto>> getAvailablePoints(@RequestBody BookingDto bd){		
		System.out.println(bd.getLongitude());
		System.out.println(bd.getLattitude());
		System.out.println(bd.getStartTime());
		System.out.println(bd.getEndTime());
		System.out.println(bd.getVehicle().getId());
//		return null;
		return new ResponseEntity<Collection<StationDto>>(bookingService.getAvailableSlots(bd), HttpStatus.OK);
	}
	@PostMapping("/lockslot")
	ResponseEntity<String> lockSlot(@RequestBody LockSlotDto lsd){	
		
		return new ResponseEntity<>(bookingService.lockSlot(lsd), HttpStatus.CREATED);
	}
	
	
	@GetMapping("/confirmBooking/{id}")
	ResponseEntity<BookingDetails> confirmBooking(@PathVariable("id") String id){
		return new ResponseEntity<BookingDetails>(bookingService.confirmBooking(id), HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/getAllBookings/{id}")
	ResponseEntity<List<BookingDetails>> getAllBookings(@PathVariable("id") String id){
		return new ResponseEntity<> (bookingService.getAllBookings(id), HttpStatus.OK);
	}
	
	@GetMapping("/getAllStationBookings/{id}")
	ResponseEntity<List<BookingDetails>> getAllStationBookings(@PathVariable("id") String id){
		return new ResponseEntity<> (bookingService.getAllBookingsForStation(id), HttpStatus.OK);
	}
}
