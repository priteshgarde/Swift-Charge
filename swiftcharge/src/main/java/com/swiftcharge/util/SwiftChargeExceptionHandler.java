package com.swiftcharge.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.swiftcharge.exception.BatteryIdException;
import com.swiftcharge.exception.BookingSessionTimeOutException;
import com.swiftcharge.exception.InvalidCredentialException;
import com.swiftcharge.exception.NoSlotAvailableException;
import com.swiftcharge.exception.StationAlreadyExistsException;
import com.swiftcharge.exception.UserAlreadyExistsException;
import com.swiftcharge.exception.VehicleAlreadyRegisteredException;

@ControllerAdvice
public class SwiftChargeExceptionHandler {
	
	@ExceptionHandler(value = UserAlreadyExistsException.class)
	public ResponseEntity<Object> exception(UserAlreadyExistsException e){
		return new ResponseEntity<Object>("User already Exists", HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(value = InvalidCredentialException.class)
	public ResponseEntity<Object> exception(InvalidCredentialException e){
		return new ResponseEntity<Object>("Invalid Credentials", HttpStatus.NOT_FOUND);
	}
	@ExceptionHandler(value = StationAlreadyExistsException.class)
	public ResponseEntity<Object> exception(StationAlreadyExistsException e){
		return new ResponseEntity<Object>(e.getMessage(), HttpStatus.NOT_FOUND);
	}
	@ExceptionHandler(value = VehicleAlreadyRegisteredException.class)
	public ResponseEntity<Object> exception(VehicleAlreadyRegisteredException e){
		return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(value = BatteryIdException.class)
	public ResponseEntity<Object> exception(BatteryIdException e){
		return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(value = NoSlotAvailableException.class)
	public ResponseEntity<Object> exception(NoSlotAvailableException e){
		return new ResponseEntity<Object>("Sorry all slots are booked for this choice,"
				+ "please try again" , HttpStatus.EXPECTATION_FAILED);
	}
	@ExceptionHandler(value = BookingSessionTimeOutException.class)
	public ResponseEntity<Object> exception(BookingSessionTimeOutException e){
		return new ResponseEntity<Object>(e.getMessage() , HttpStatus.REQUEST_TIMEOUT);
	}
}
