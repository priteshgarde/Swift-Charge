package com.swiftcharge.mapstruct.dto.requestDto;

import java.time.LocalDate;

import com.swiftcharge.mapstruct.dto.responseDto.UserDto;
import com.swiftcharge.util.VehicleType;

import lombok.Data;

@Data
public class VehicleRequestDto {

	private String id;

	private UserDto user;

	private VehicleType vehicleType;

	private String vehicleNumber;

	private String batteryId;
	
	private LocalDate validity;
}
