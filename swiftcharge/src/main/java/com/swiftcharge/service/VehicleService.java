package com.swiftcharge.service;

import com.swiftcharge.mapstruct.dto.requestDto.VehicleRequestDto;
import com.swiftcharge.mapstruct.dto.responseDto.VehicleDto;

public interface VehicleService {

	VehicleDto addVehicle(VehicleRequestDto newVehicle);
	
}
