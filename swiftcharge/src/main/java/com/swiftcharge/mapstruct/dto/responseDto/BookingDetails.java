package com.swiftcharge.mapstruct.dto.responseDto;

import java.time.LocalDateTime;

public interface BookingDetails {

	String getId();

	ChargingPointDetails getPoint();

	StationSummary getStation();
	
	VehicleSummary getVehicle();
	
	LocalDateTime getStartTime();
	
	LocalDateTime getEndTime();
	
	interface VehicleSummary{
		String getVehicleNumber();
	}
	interface ChargingPointDetails{
		String getId();
	}

}
