package com.alex.kata_3_1_3.repository;

import com.alex.kata_3_1_3.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
