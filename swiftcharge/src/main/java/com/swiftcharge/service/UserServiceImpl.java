package com.swiftcharge.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.swiftcharge.entity.User;
import com.swiftcharge.exception.InvalidCredentialException;
import com.swiftcharge.exception.UserAlreadyExistsException;
import com.swiftcharge.mapstruct.dto.requestDto.LoginDto;
import com.swiftcharge.mapstruct.dto.requestDto.UserRegisterDto;
import com.swiftcharge.mapstruct.dto.responseDto.UserDto;
import com.swiftcharge.mapstruct.mapper.MapStructMapper;
import com.swiftcharge.repository.UserRepository;
import com.swiftcharge.util.EmailService;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private MapStructMapper mapStructMapper;
	@Autowired
	EmailService emailService;

	public Integer isNewUser(UserRegisterDto userRegisterDto) {
		if (userRepository.findByEmailOrPhone(userRegisterDto.getEmail(), userRegisterDto.getPhone()) == null) {
			int otp = generateOtp();
			log.info(String.valueOf(otp));
//			emailService.sendEmailForNewRegistration(userRegisterDto.getEmail(), otp);
			return otp;
		}

		throw new UserAlreadyExistsException();

	}

	private int generateOtp() {
		return (int) (Math.random() * 10000) + 999;

	}

	public String registerUser(UserRegisterDto userRegisterDto) {
		User user = mapStructMapper.UserRegisterDtoToUser(userRegisterDto);
		user.setId(user.getEmail().hashCode() + Double.toHexString(Double.parseDouble(user.getPhone())));
		if (userRepository.findByEmailOrPhone(user.getEmail(), user.getPhone()) == null)
			return userRepository.save(user).getId();
		throw new UserAlreadyExistsException();

	}

	public UserDto login(LoginDto loginDto) {
		User user;
		System.out.println(loginDto.getUsername());
		System.out.println(loginDto.getPassword());

		try {
			Double.parseDouble(loginDto.getUsername());
			user = userRepository.findByPhoneAndPassword(loginDto.getUsername(), loginDto.getPassword());
		} catch (NumberFormatException e) {
			user = userRepository.findByEmailAndPassword(loginDto.getUsername(), loginDto.getPassword());
		}
		if (user == null)
			throw new InvalidCredentialException();
		System.out.println(user);
		return mapStructMapper.UserToUserDto(user);
	}
}
