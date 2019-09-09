package com.ex.dao;

import com.ex.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProfileDao extends JpaRepository<Profile, Integer> {
    @Query("select  nameProfile from Profile where idGroupProfile=:id")
    List<String> findByIdGroup(@Param("id") Integer id);


}
