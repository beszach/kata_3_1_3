package com.alex.kata_3_1_3.controller;


import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@Log4j2
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("")
    public String getTable(){
        log.info("Загрузка страницы /admin");
        return "admin_users2";
    }

}
