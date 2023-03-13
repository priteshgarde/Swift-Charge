package com.swiftcharge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.swiftcharge.entity.User;
import com.swiftcharge.mapstruct.dto.requestDto.LoginDto;
import com.swiftcharge.mapstruct.dto.requestDto.UserRegisterDto;
import com.swiftcharge.mapstruct.dto.responseDto.UserDto;
import com.swiftcharge.mapstruct.mapper.MapStructMapper;
import com.swiftcharge.service.UserService;

@RestController
@CrossOrigin
public class UserController {
	@Autowired
	UserService userService;

	@PostMapping("/register")
	public ResponseEntity<Object> create(@RequestBody UserRegisterDto userRegisterDto) {
		String id = userService.registerUser(userRegisterDto);
		return new ResponseEntity<Object>("User created successfully ID: " + id, HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<UserDto> login(@RequestBody LoginDto loginDto){
		return new ResponseEntity<>( userService.login(loginDto), HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/newUser")
	public ResponseEntity<Object> isNewUser(@RequestBody UserRegisterDto userRegisterDto){
		return new ResponseEntity<>(userService.isNewUser(userRegisterDto), HttpStatus.ACCEPTED);
	}
}
