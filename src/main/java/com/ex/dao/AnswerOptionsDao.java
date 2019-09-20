package com.ex.dao;

import com.ex.entity.AnswerOptions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnswerOptionsDao extends JpaRepository<AnswerOptions, Integer> {

    @Query("select u from AnswerOptions u where u.question.idQuestion = :id")
    List<AnswerOptions> findAnswerByIdQuestion(@Param("id")Integer id);


}

