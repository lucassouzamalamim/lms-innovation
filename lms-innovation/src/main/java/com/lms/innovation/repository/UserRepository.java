package com.lms.innovation.repository;

import com.lms.innovation.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, Long> {
    // Método mágico do Spring Data para buscar pelo email
    UserDetails findByEmail(String email);

    User findUserByEmail(String email);
}
