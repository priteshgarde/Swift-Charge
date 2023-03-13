package com.swiftcharge.mapstruct.dto.responseDto;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.swiftcharge.entity.Station;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class ChargingPointDto {

	private String Id;
	
	private String StationId;
	
	@Override
	public int hashCode() {
		return Id.hashCode();
	}
	
	@Override 
	public boolean equals(Object obj) {
		return Id.equals(obj);
	}


}
