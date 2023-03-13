package com.swiftcharge.service;

import java.util.List;

import com.swiftcharge.mapstruct.dto.requestDto.StationUpdateDto;
import com.swiftcharge.mapstruct.dto.responseDto.StationDto;
import com.swiftcharge.mapstruct.dto.responseDto.StationSummary;

public interface StationService {
	StationDto addNewStation(StationUpdateDto newStation);

	List<StationDto> unapprovedStations();

	void approveStation(String id);
}
