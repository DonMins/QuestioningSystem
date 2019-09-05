package com.ex.service;


import com.ex.dao.UserDao;

import com.ex.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


/**
 * UserServiceImpl implements UserService
 *
 * @author Zdornov Maxim
 * @version 1.0
 */

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    /**
     *
     To save the user in the database, we also fill in the columns in the "ratings" table with
     zeros and the empty history in the "history" table
     * @param user of class User
     */

    @Override
    public void save(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userDao.save(user);
    }

    @Override
    public User findByUsername(String username) {
        return userDao.findByUsername(username);
    }
}