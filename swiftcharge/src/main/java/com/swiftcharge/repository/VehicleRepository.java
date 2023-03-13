package com.swiftcharge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.swiftcharge.entity.Vehicle;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, String> {
	Vehicle findByVehicleNumber(String number);
}