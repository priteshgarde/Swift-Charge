package com.swiftcharge.mapstruct.dto.responseDto;

import java.util.Set;

public interface StationSummary {

	String getId();
	
	double getLatitude();
	
	double getLongitude();
	
	String getStationName();
	
	int getTotalPoints();
	
}
