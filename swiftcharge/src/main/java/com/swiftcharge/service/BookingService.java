package com.swiftcharge.service;

import java.util.Collection;
import java.util.List;

import org.springframework.util.MultiValueMap;

import com.swiftcharge.mapstruct.dto.requestDto.BookingDto;
import com.swiftcharge.mapstruct.dto.requestDto.LockSlotDto;
import com.swiftcharge.mapstruct.dto.responseDto.BookingDetails;
import com.swiftcharge.mapstruct.dto.responseDto.StationDto;

public interface BookingService {
	
	public List<StationDto> getNearbyStations(BookingDto bookingDto);
	
	public Collection<StationDto> getAvailableSlots(BookingDto bd);

	public String lockSlot(LockSlotDto lsd);

	public BookingDetails confirmBooking(String id);

	public List<BookingDetails> getAllBookings(String userId);
	
	List<BookingDetails> getAllBookingsForStation(String stationId);

}
