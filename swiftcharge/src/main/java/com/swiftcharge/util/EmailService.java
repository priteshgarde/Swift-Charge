package com.swiftcharge.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

	 @Autowired
	 private JavaMailSender emailSender;

	 public void sendEmailForNewRegistration(String email, int otp) {
		SimpleMailMessage message = new SimpleMailMessage(); 
//        message.setFrom("twosoulproject@gmail.com");
        message.setFrom("SwiftCharge");
        message.setTo(email); 
        message.setSubject("Otp for registering on SwiftCharge"); 
        message.setText("Otp is "+ otp);
        emailSender.send(message);
	 }
}
