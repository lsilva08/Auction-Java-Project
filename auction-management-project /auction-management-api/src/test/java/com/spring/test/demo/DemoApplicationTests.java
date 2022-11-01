package com.spring.test.demo;

import com.spring.test.demo.controller.TokenFactory;
import com.spring.test.demo.model.Users;
import com.spring.test.demo.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
public class DemoApplicationTests {

	@Autowired
	protected MockMvc mockMvc;

	@MockBean(UserRepository.class)
	private UserRepository userRepository;

	@Test
	void contextLoads() throws Exception {
		when(userRepository.findByEmail("test@test.com")).thenReturn(new Users(1, "test@test.com", "123"));
		TokenFactory.generateToken(mockMvc, "test@test.com", "123");
	}

}
