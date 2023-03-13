package com.swiftcharge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.swiftcharge.mapstruct.dto.requestDto.VehicleRequestDto;
import com.swiftcharge.mapstruct.dto.responseDto.VehicleDto;
import com.swiftcharge.service.VehicleService;

import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin
@Slf4j
public class VehicleController {

	@Autowired
	VehicleService vehicleService;
	
	@PostMapping("/addVehicle")
	public ResponseEntity<VehicleDto> addVehicle(@RequestBody VehicleRequestDto newVehicle){
		System.out.println(newVehicle.getVehicleType());
		return new ResponseEntity<>(vehicleService.addVehicle(newVehicle), HttpStatus.CREATED);
	}
}
