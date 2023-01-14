package com.prakash.swachhbharatbackend.repositories;

import com.prakash.swachhbharatbackend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

}
