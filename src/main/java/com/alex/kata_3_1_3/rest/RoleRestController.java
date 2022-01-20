package com.alex.kata_3_1_3.rest;

import com.alex.kata_3_1_3.model.Role;
import com.alex.kata_3_1_3.service.RoleService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@Log4j2
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class RoleRestController {
    @Autowired
    RoleService roleService;

    @GetMapping("/roles")
    public List<Role> getRoles(){
        return roleService.getAll();
    }

}
