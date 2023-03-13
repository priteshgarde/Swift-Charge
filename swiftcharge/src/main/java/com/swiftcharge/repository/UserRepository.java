package com.swiftcharge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.swiftcharge.entity.Role;
import com.swiftcharge.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
	User findByEmailOrPhone(String email, String phone);
	
	User findByEmailAndPassword(String email, String password);
	
	User findByPhoneAndPassword(String phone, String password);
	
	@Modifying
	@Query("UPDATE User u SET u.role = ?1 WHERE u.id = ?2")
	void updateRole(Role role, String id);
}
