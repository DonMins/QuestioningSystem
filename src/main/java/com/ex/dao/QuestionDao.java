package com.ex.dao;

import com.ex.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionDao  extends JpaRepository<Question, Integer> {
    @Query("select u from Question u where u.profile.idProfile = :id")
    List<Question> findQuestionByIdProfile(@Param("id")Integer id);

}
