package com.alex.kata_3_1_3.service;


import com.alex.kata_3_1_3.model.Role;
import com.alex.kata_3_1_3.repository.RoleRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class RoleServiceDataBase implements RoleService{

    private final RoleRepository roleRepository;

    public RoleServiceDataBase(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Transactional
    @Override
    public void add(Role role) {
        roleRepository.saveAndFlush(role);
    }


    @Transactional
    @Override
    public List<Role> getAll() {
        return roleRepository.findAll();
    }

}
