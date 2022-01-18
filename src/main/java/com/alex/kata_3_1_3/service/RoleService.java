package com.alex.kata_3_1_3.service;

import com.alex.kata_3_1_3.model.Role;

import java.util.List;

public interface RoleService {
    void add(Role roleName);
    List<Role> getAll();
}
