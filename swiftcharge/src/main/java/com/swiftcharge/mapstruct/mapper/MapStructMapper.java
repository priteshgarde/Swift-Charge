package com.swiftcharge.mapstruct.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.swiftcharge.entity.ChargingPoint;
import com.swiftcharge.entity.Role;
import com.swiftcharge.entity.Station;
import com.swiftcharge.entity.User;
import com.swiftcharge.entity.Vehicle;
import com.swiftcharge.mapstruct.dto.RoleDto;
import com.swiftcharge.mapstruct.dto.requestDto.StationUpdateDto;
import com.swiftcharge.mapstruct.dto.requestDto.UserRegisterDto;
import com.swiftcharge.mapstruct.dto.requestDto.VehicleRequestDto;
import com.swiftcharge.mapstruct.dto.responseDto.ChargingPointDto;
import com.swiftcharge.mapstruct.dto.responseDto.ChargingPointSummary;
import com.swiftcharge.mapstruct.dto.responseDto.StationDto;
import com.swiftcharge.mapstruct.dto.responseDto.StationSummary;
import com.swiftcharge.mapstruct.dto.responseDto.UserDto;
import com.swiftcharge.mapstruct.dto.responseDto.VehicleDto;

@Mapper( componentModel = "spring")
public interface MapStructMapper {
	
	Role RoleDtoToRole(RoleDto roleDto);
	
	User UserRegisterDtoToUser(UserRegisterDto userRegisterDto);
	
	Vehicle VehicleDtoToVehicle(VehicleDto vehicleDto);
	
	Station StationDtoToStation(StationDto stationDto);
	
	ChargingPoint ChargingPointDtoToChargingPoint(ChargingPointDto chargingPointDto);
	
	RoleDto RoleToRoleDto(Role role);

	UserDto UserToUserDto(User user);
	
	VehicleDto VehicleToVehicleDto(Vehicle vehicle);
	
	StationDto StationtoStationDto(Station station);
	
	ChargingPointDto ChargingPointToChargingPointDto(ChargingPoint chargingPoint);

	Station StationUpdateDtoToStation(StationUpdateDto newStation);

	Vehicle VehicleRequestDtoToVehicle(VehicleRequestDto newVehicle);

	List<StationDto> StationSummaryListToStationDtoList(List<StationSummary> stationSummary);
	
	StationDto StationSummaryToStationDto(StationSummary stationSummary);

	ChargingPointDto ChargingPointSummaryToChargingPointDto(ChargingPointSummary cp);
	
	List<StationDto> StationListToStationDtoList(List<Station> stations);
	
}
