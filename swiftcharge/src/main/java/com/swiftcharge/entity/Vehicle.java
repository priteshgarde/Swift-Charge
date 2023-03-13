package com.swiftcharge.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.swiftcharge.util.VehicleType;

import lombok.ToString;

@Entity

@Table(name = "vehicle_table")
public class Vehicle {
	@Id
	@Column(name = "vehicle_id")
	private String id;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	@Column(nullable = false)
	
	@Enumerated(EnumType.STRING)
	private VehicleType vehicleType;
	
	@Column(nullable = false, unique = true)
	private String vehicleNumber;
	
	@Column(unique = true)
	private String batteryId;
	private LocalDate validity;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}

	public VehicleType getVehicleType() {
		return vehicleType;
	}
	public void setVehicleType(VehicleType vehicleType) {
		this.vehicleType = vehicleType;
	}
	public String getVehicleNumber() {
		return vehicleNumber;
	}
	public void setVehicleNumber(String vehicleNumber) {
		this.vehicleNumber = vehicleNumber;
	}
	public String getBatteryId() {
		return batteryId;
	}
	public void setBatteryId(String batteryId) {
		this.batteryId = batteryId;
	}
	public LocalDate getValidity() {
		return validity;
	}
	public void setValidity(LocalDate validity) {
		this.validity = validity;
	}

}
