package com.alex.kata_3_1_3.config;

import com.alex.kata_3_1_3.model.Role;
import com.alex.kata_3_1_3.model.User;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.transaction.Transactional;

@Component
@Transactional
@Log4j2
public class InitialInitConfig {

    private final EntityManagerFactory entityManagerFactory;
    private final PasswordEncoder passwordEncoder;

    public InitialInitConfig(EntityManagerFactory entityManagerFactory, PasswordEncoder passwordEncoder) {
        this.entityManagerFactory = entityManagerFactory;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void initValues(){
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();
        Role role1 = new Role("ROLE_ADMIN");
        Role role2 = new Role("ROLE_DEVELOPER");
        Role role3 = new Role("ROLE_USER");
        Role role4 = new Role("ROLE_HR");
        Role role5 = new Role("ROLE_MANAGER");

        log.info("Add init role: "+role1);

        entityManager.persist(role1);
        entityManager.persist(role2);
        entityManager.persist(role3);
        entityManager.persist(role4);
        entityManager.persist(role5);

        User admin = new User("admin", "admin", "admin@mail.ru");
        admin.setAge(1);
        admin.setPassword(passwordEncoder.encode("admin"));
        admin.addRole(role1);
        admin.addRole(role2);
        entityManager.persist(admin);

        User user1 = new User("Alex", "Alex", "email1@mail.ru");
        user1.setAge(1);
        user1.setPassword(passwordEncoder.encode("email1@mail.ru"));
        user1.addRole(role1);
        entityManager.persist(user1);

        User user2 = new User("Dasha", "Dasha", "email2@mail.ru");
        user2.setAge(2);
        user2.setPassword(passwordEncoder.encode("email2@mail.ru"));
        user2.addRole(role1);
        entityManager.persist(user2);

        User user = new User("user", "user", "user@mail.ru");
        user.setAge(3);
        user.setPassword(passwordEncoder.encode("user"));
        user.addRole(role3);
        entityManager.persist(user);

        entityManager.getTransaction().commit();
        entityManager.close();
    }

}
