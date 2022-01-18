package com.alex.kata_3_1_3.repository;


import com.alex.kata_3_1_3.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
