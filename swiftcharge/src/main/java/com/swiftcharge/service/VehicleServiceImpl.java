package com.swiftcharge.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.swiftcharge.entity.Role;
import com.swiftcharge.entity.Vehicle;
import com.swiftcharge.exception.BatteryIdException;
import com.swiftcharge.exception.VehicleAlreadyRegisteredException;
import com.swiftcharge.mapstruct.dto.requestDto.VehicleRequestDto;
import com.swiftcharge.mapstruct.dto.responseDto.VehicleDto;
import com.swiftcharge.mapstruct.mapper.MapStructMapper;
import com.swiftcharge.repository.UserRepository;
import com.swiftcharge.repository.VehicleRepository;

@Service
@Transactional
public class VehicleServiceImpl implements VehicleService {

	@Autowired
	private MapStructMapper mapStructMapper;
	@Autowired
	private VehicleRepository vehicleRepository;
	@Autowired
	private UserRepository userRepository;

	@Override
	public VehicleDto addVehicle(VehicleRequestDto newVehicle) {
		Vehicle vehicle = mapStructMapper.VehicleRequestDtoToVehicle(newVehicle);
		if (vehicleRepository.findByVehicleNumber(vehicle.getVehicleNumber()) != null)
			throw new VehicleAlreadyRegisteredException(
					"Vehicle " + vehicle.getVehicleNumber() + " is already registered");

		vehicle.setId(String.valueOf(vehicle.getVehicleNumber().hashCode()));
		try {
			if (vehicle.getBatteryId() != null) {
				Role role = new Role();
				role.setId(4);
				userRepository.updateRole(role, vehicle.getUser().getId());
			}
			return mapStructMapper.VehicleToVehicleDto(vehicleRepository.save(vehicle));
		} catch (DataIntegrityViolationException e) {
			e.printStackTrace();
			throw new BatteryIdException("Battery " + vehicle.getBatteryId() + " belongs to other vehicle");
		}
	}

}
