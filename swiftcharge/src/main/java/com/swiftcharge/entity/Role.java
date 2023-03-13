package com.swiftcharge.entity;


import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.ToString;

@Entity

@Table(name = "Role_table")
public class Role {
	
	@Id
	@Column(name = "role_id")
	private int id;
	
	@Column(nullable = false)
	private String role;
	
	@JsonIgnore
	@OneToMany(mappedBy = "role")
	private Set<User> users;
	
	public Set<User> getUsers() {
		return users;
	}
	public void setUsers(Set<User> users) {
		this.users = users;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}

	
}
// add util package if necessary
// write constants in interface