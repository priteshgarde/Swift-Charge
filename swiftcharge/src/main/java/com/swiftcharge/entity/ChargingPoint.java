package com.swiftcharge.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.ToString;

@Entity

@Table(name = "charging_point_table")
public class ChargingPoint {
	@Id
	@Column(name = "point_id")
	private String Id;
	
	@ManyToOne
	@JoinColumn(name = "station_id", nullable = false)
	private Station station;

	public String getId() {
		return Id;
	}

	public void setId(String id) {
		Id = id;
	}

	public Station getStation() {
		return station;
	}

	public void setStation(Station station) {
		this.station = station;
	}
	
	@Override
	public int hashCode() {
		return this.Id.hashCode();
	}
	
	@Override
	public boolean equals(Object obj) {
		 if(this == obj)
	            return true;
		 if(obj == null || obj.getClass()!= this.getClass())
	            return false;
		 ChargingPoint cp = (ChargingPoint) obj;
		 return this.Id.equals(cp.Id);
	}
	
	
}
