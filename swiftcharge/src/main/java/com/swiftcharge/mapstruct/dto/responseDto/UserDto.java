package com.swiftcharge.mapstruct.dto.responseDto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.swiftcharge.entity.Role;
import com.swiftcharge.entity.Station;
import com.swiftcharge.entity.Vehicle;
import com.swiftcharge.mapstruct.dto.RoleDto;

import lombok.Data;

@Data
public class UserDto {
	private String id;

	private RoleDto role;

	private String name;

	private String email;

	private String phone;

	private List<VehicleDto> vehicles;

	private StationDto station;

}
