package com.swiftcharge.controller;

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
import org.springframework.web.servlet.function.EntityResponse;

import com.swiftcharge.mapstruct.dto.requestDto.StationUpdateDto;
import com.swiftcharge.mapstruct.dto.responseDto.StationDto;
import com.swiftcharge.mapstruct.dto.responseDto.StationSummary;
import com.swiftcharge.service.StationService;

@RestController
@CrossOrigin
public class StationController {

	@Autowired
	StationService stationService;

	@PostMapping("/addStation")
	public ResponseEntity<StationDto> addStation(@RequestBody StationUpdateDto newStation) {
//		System.out.println(newStation);
		return new ResponseEntity<>(stationService.addNewStation(newStation), HttpStatus.CREATED);
	}
	
	@GetMapping("/stationRequests")
	public ResponseEntity<List<StationDto>> stationrRequests() {
		return new ResponseEntity<>(stationService.unapprovedStations(), HttpStatus.OK);
	}
	
	@GetMapping("/approveStation/{id}")
	public ResponseEntity<String> approveStation(@PathVariable("id") String id) {
		stationService.approveStation(id);
		return new ResponseEntity<>("Approved " + id, HttpStatus.OK);
	}
}
