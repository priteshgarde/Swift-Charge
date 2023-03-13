package com.swiftcharge.mapstruct.dto.responseDto;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.swiftcharge.entity.ChargingPoint;
import com.swiftcharge.entity.User;

import lombok.Data;

@Data
public class StationDto {
	
	private String id;
	
	private String registrationNumber;
	
	private double latitude;

	private double longitude;
	
	private String stationName;
	
	private boolean isApproved;
	
	private int totalPoints;
	
	Set<ChargingPointDto> chargingPoints;
	
	{
		chargingPoints = new HashSet<>();
	}
}
