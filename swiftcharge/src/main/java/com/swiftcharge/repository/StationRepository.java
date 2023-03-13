package com.swiftcharge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.swiftcharge.entity.Station;
import com.swiftcharge.mapstruct.dto.responseDto.StationDto;
import com.swiftcharge.mapstruct.dto.responseDto.StationSummary;

@Repository
public interface StationRepository extends JpaRepository<Station, String> {

	Station findByRegistrationNumber(String registrationNumber);
	
	@Query(value =  "SELECT station_id as id, latitude, longitude, station_name as stationName, total_points as totalPoints FROM station_table "
			+ "WHERE latitude BETWEEN ?1 AND ?2 AND longitude BETWEEN ?3 AND ?4 and is_approved = true", nativeQuery = true )
	
	List<StationSummary> findNearbyStations(double lowerLat, double upperLat, double lowerLong, double upperLong);

	List<Station> findByIsApprovedFalse();

	@Modifying
	@Query("update Station s set s.isApproved = true where s.id = ?1")
	void approveStation(String id);
	
	
}
