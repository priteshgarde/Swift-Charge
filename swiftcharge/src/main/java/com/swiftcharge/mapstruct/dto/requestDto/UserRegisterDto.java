package com.swiftcharge.mapstruct.dto.requestDto;



import com.swiftcharge.entity.Role;
import com.swiftcharge.mapstruct.dto.RoleDto;

public class UserRegisterDto {

	private RoleDto role;

	private String name;

	private String email;

	private String phone;

	private String password;

	

	public RoleDto getRole() {
		return role;
	}

	public void setRole(RoleDto role) {
		this.role = role;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
