package com.alex.kata_3_1_3.controller;


import com.alex.kata_3_1_3.exception_handling.NoSuchUserException;
import com.alex.kata_3_1_3.model.Role;
import com.alex.kata_3_1_3.model.User;
import com.alex.kata_3_1_3.service.RoleService;
import com.alex.kata_3_1_3.service.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@Log4j2
public class MyRestController {

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    @GetMapping(value = "/users", produces ="application/json")
    public ResponseEntity<List<User>> getUsers(){
        List<User> allUsers = userService.getAll();
        log.info("Rest all users: "+allUsers);
        return ResponseEntity.ok(allUsers);
    }

//    @GetMapping(value = "/users", produces ="application/json")
//    public List<User> getUsers(){
//        List<User> allUsers = userService.getAll();
//        log.info("Rest all users: "+allUsers);
//        return allUsers;
//    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable long id){
        User user = userService.getById(id);
        log.info("Rest user: "+user);
        if(user == null){
            throw new NoSuchUserException("User with id: "+id+" not found");
        }
        return user;
    }

    @GetMapping("/roles")
    public List<Role> getRoles(){
        return roleService.getAll();
    }

    @GetMapping("/auth_user")
    public User authUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

    @PostMapping("/users")
    public User addUser(@RequestBody User user){
        log.info("Rest add user: "+user);
        userService.add(user);
        return user;
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User user){
        log.info("Rest update user: "+user);
        userService.update(user);
        return user;
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable long id){
        userService.delete(id);
        return "user with id: "+id+" was deleted";
    }

}
