package com.swiftcharge.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.ToString;

@Entity

@Table(name = "station_table")
public class Station {
	
	@Id
	@Column(name = "station_id")
	private String id;
	
	@Column(nullable = false, unique = true)
	private String registrationNumber;
	
	@OneToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	@Column(nullable = false)
	private double latitude;
	
	@Column(nullable = false)
	private double longitude;
	
	@Column(name = "station_name")
	private String stationName;
	
	@Column(nullable = false)
	private boolean isApproved;
	
	@Column(name = "total_points")
	private int totalPoints;
	
	@OneToMany(mappedBy = "station", cascade = CascadeType.ALL)
	Set<ChargingPoint> chargingPoints;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getRegistrationNumber() {
		return registrationNumber;
	}
	public void setRegistrationNumber(String registrationNumber) {
		this.registrationNumber = registrationNumber;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public String getStationName() {
		return stationName;
	}
	public void setStationName(String stationName) {
		this.stationName = stationName;
	}
	public boolean isApproved() {
		return isApproved;
	}
	public void setApproved(boolean isApproved) {
		this.isApproved = isApproved;
	}
	public Set<ChargingPoint> getChargingPoints() {
		return chargingPoints;
	}
	public void setChargingPoints(Set<ChargingPoint> chargingPoints) {
		this.chargingPoints = chargingPoints;
	}
	public int getTotalPoints() {
		return totalPoints;
	}
	public void setTotalPoints(int totalPoints) {
		this.totalPoints = totalPoints;
	}
	
	
}
