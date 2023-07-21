package com.intern.work.Assignment.repository;

import com.intern.work.Assignment.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
    boolean existsByusername(String userName);
    boolean existsByEmail(String email);

    User findByUsername(String username);

}
