package com.swiftcharge.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.swiftcharge.entity.User;
import com.swiftcharge.mapstruct.dto.requestDto.LoginDto;
import com.swiftcharge.mapstruct.dto.requestDto.UserRegisterDto;
import com.swiftcharge.mapstruct.dto.responseDto.UserDto;


public interface UserService {
	public String registerUser(UserRegisterDto userRegisterDto);

	public UserDto login(LoginDto loginDto);

	public Integer isNewUser(UserRegisterDto userRegisterDto);

	
}
