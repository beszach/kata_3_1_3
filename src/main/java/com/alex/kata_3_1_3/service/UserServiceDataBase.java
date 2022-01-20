package com.alex.kata_3_1_3.service;

import com.alex.kata_3_1_3.model.User;
import com.alex.kata_3_1_3.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;


@Service
@Transactional
@Log4j2
public class UserServiceDataBase implements UserService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    @Autowired
    public UserServiceDataBase(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public void add(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.saveAndFlush(user);
        log.info("Add user: {}", user);
    }

    @Override
    public void update(User userUpdated) {
        if(userUpdated.getPassword().equals("")){
            userUpdated.setPassword(getById(userUpdated.getId()).getPassword());
        } else {
            userUpdated.setPassword(passwordEncoder.encode(userUpdated.getPassword()));
        }
        userRepository.saveAndFlush(userUpdated);
        log.info("Update user: {}",  userUpdated);
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
        log.info("Delete user with id: {}", id);
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User getById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}
