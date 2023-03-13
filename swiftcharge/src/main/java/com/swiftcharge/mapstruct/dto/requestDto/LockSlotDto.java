package com.swiftcharge.mapstruct.dto.requestDto;

import com.swiftcharge.mapstruct.dto.responseDto.StationDto;

import lombok.Data;

@Data
public class LockSlotDto {

	BookingDto bookingDto;
	StationDto station;
}
