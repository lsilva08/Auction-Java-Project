package com.spring.test.demo.repository;

import com.spring.test.demo.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
//The repository that will make the communication with the database
public interface UserRepository extends JpaRepository<Users, Integer> {

    Users findByEmail(String email);

}