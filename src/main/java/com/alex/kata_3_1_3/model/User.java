package com.alex.kata_3_1_3.model;

import com.fasterxml.jackson.annotation.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.Collection;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class User implements UserDetails {

   @Id
   @Column(name = "id", nullable = false)
   @JsonProperty("id")
   @JsonPropertyOrder("1")
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @Column(name = "name", nullable = false)
   @JsonProperty("firstName")
   @JsonPropertyOrder("2")
   private String firstName;

   @Column(name = "last_name", nullable = false)
   @JsonProperty("lastName")
   @JsonPropertyOrder("3")
   private String lastName;

   @Email
   @Column(name = "email", unique = false, nullable = false)
   @JsonProperty("email")
   @JsonPropertyOrder("4")
   private String email;

   @Column(name = "age", nullable = false)
   @JsonProperty("age")
   @JsonPropertyOrder("5")
   private int age;

   @Column(name="password", nullable = false)
   @JsonProperty("password")
   @JsonPropertyOrder("6")
   private String password;

   @ManyToMany(cascade = {CascadeType.MERGE},fetch = FetchType.EAGER)
   @JoinTable(name = "users_roles",
   joinColumns = @JoinColumn(name = "users_id"),
   inverseJoinColumns = @JoinColumn(name = "roles_id"))
   @JsonProperty("roleList")
   @JsonPropertyOrder("7")
   private Set<Role> roleList = new HashSet<>();

   public User() {}

   public User(String firstName, String lastName, String email) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
   }

   public User(String firstName, String lastName, String email, Role role) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
   }

   public void addRole(Role role){
      roleList.add(role);
   }

   @JsonIgnore
   @Override
   public Collection<? extends GrantedAuthority> getAuthorities() {
      return roleList;
   }

   @JsonIgnore
   @Override
   public String getUsername() {
      return email;
   }

   @JsonIgnore
   @Override
   public boolean isAccountNonExpired() {
      return true;
   }

   @JsonIgnore
   @Override
   public boolean isAccountNonLocked() {
      return true;
   }

   @JsonIgnore
   @Override
   public boolean isCredentialsNonExpired() {
      return true;
   }

   @JsonIgnore
   @Override
   public boolean isEnabled() {
      return true;
   }

   @Override
   public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;
      User user = (User) o;
      return Objects.equals(id, user.id);
   }

   @Override
   public int hashCode() {
      return Objects.hash(id);
   }

   @Override
   public String toString() {
      return "User{" +
              "id=" + id +
              ", firstName='" + firstName + '\'' +
              ", lastName='" + lastName + '\'' +
              ", email='" + email + '\'' +
              ", age=" + age +
              ", password='" + password + '\'' +
              ", roleList=" + roleList +
              '}';
   }
}
