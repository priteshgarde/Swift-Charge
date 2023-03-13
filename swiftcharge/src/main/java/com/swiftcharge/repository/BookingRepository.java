package com.swiftcharge.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.swiftcharge.entity.Booking;
import com.swiftcharge.mapstruct.dto.responseDto.BookingDetails;
import com.swiftcharge.mapstruct.dto.responseDto.ChargingPointDto;
import com.swiftcharge.mapstruct.dto.responseDto.ChargingPointSummary;
import com.swiftcharge.mapstruct.dto.responseDto.StationSummary;

@Repository
public interface BookingRepository extends JpaRepository<Booking, String> {
	
//	@Query("SELECT b.id, b.station.id, b.chargingPoint.id, b.startTime, b.endTime FROM Booking b WHERE b.id = ?1")
	@Query(nativeQuery = true, value = "select * from booking_table where booking_id = ?1")
	Booking fetchById(String id);

	@Query(value = "select point_id as id, station_id as StationId from charging_point_table where\r\n"
			+ "station_id in (:stations) and\r\n"
			+ "point_id not in (select distinct point_id from booking_table where station_id in (:stations) \r\n"
			+ "and \r\n"
			+ "((:startTime >= start_time and :startTime < end_time )\r\n"
			+ "or (:endTime > start_time and :endTime <= end_time)\r\n"
			+ "or (:startTime <= start_time and :endTime > start_time)\r\n"
			+ "or (:startTime < end_time and :endTime >= end_time)))", nativeQuery = true)
	List<ChargingPointSummary> getAvailableChargingPoints(@Param("stations") List<String> stations, 
			@Param("startTime") LocalDateTime startTime, @Param("endTime") LocalDateTime endTime );
	
	@Procedure(procedureName  = "book_slot")
	void lockSlot (@Param("booking_id") String bookingId, @Param("startTime") LocalDateTime startTime,
			@Param("endTime") LocalDateTime endTime, @Param("stationId") String stationId,
			@Param("pointId") String pointId, @Param("vehicleId") String vehicleId);
	
	BookingDetails getBookingDetailsById(String id);

	@Modifying
	@Query("update Booking b set b.status = 'BOOKED' where b.id = ?1")
	void confirmBooking(String id);
	
	@Query("select b from Booking b where b.vehicle.user.id = ?1 order by b.startTime desc")
	List<BookingDetails> findAllBookingsByUserId(String userId);
	
	@Query("select b from Booking b where b.point.station.id = ?1 order by b.startTime desc")
	List<BookingDetails> findAllBookingsByStationId(String stationId);
}
