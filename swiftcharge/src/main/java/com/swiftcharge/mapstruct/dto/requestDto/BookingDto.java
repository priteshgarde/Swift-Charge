package com.swiftcharge.mapstruct.dto.requestDto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.swiftcharge.mapstruct.dto.responseDto.VehicleDto;

import lombok.Data;

@Data
public class BookingDto {

	private VehicleDto vehicle;
	
	private double lattitude;
	
	private double longitude;
	
	private LocalDateTime startTime;
	
	private LocalDateTime endTime;
}
