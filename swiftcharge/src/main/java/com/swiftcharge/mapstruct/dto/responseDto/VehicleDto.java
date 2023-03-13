package com.swiftcharge.mapstruct.dto.responseDto;

import java.time.LocalDate;


import com.swiftcharge.util.VehicleType;

import lombok.Data;

@Data
public class VehicleDto {

	private String id;
	
	private VehicleType vehicleType;

	private String vehicleNumber;

	private String batteryId;
	
	private LocalDate validity;
}
