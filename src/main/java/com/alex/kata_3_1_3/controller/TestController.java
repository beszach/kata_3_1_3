package com.alex.kata_3_1_3.controller;

import com.alex.kata_3_1_3.model.User;
import com.alex.kata_3_1_3.service.RoleService;
import com.alex.kata_3_1_3.service.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Log4j2
public class TestController {

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    @GetMapping("/test")
    public String test(){
        return "test";
    }

    @GetMapping("/test2")
    public String test2(){
        return "test2";
    }

}
