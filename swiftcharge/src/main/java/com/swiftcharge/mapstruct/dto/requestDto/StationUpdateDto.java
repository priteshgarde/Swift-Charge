package com.swiftcharge.mapstruct.dto.requestDto;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.swiftcharge.entity.ChargingPoint;
import com.swiftcharge.entity.User;
import com.swiftcharge.mapstruct.dto.responseDto.UserDto;

import lombok.Data;

@Data
public class StationUpdateDto {

	private String id;
	
	private String registrationNumber;
	
	private UserDto user;
	
	private double latitude;
	
	private double longitude;
	
	private String stationName;
	
	private boolean isApproved;
	
	private int totalPoints;
	
}
