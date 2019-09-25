package com.ex.dao;

import com.ex.entity.AnswerOptions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AnswerOptionsDao extends JpaRepository<AnswerOptions, Integer> {

    @Query("select u from AnswerOptions u where u.question.idQuestion = :id")
    List<AnswerOptions> findAnswerByIdQuestion(@Param("id")Integer id);

    @Modifying
    @Transactional
    @Query(value = "delete from AnswerOptions  where QUESTION_IDQUESTION = :id", nativeQuery = true)
    void deleteByIdQuestion(@Param("id")Integer id);

    @Modifying
    @Transactional
    @Query(value = "delete from AnswerOptions  where QUESTION_IDQUESTION in (select IDQUESTION from QUESTION where PROFILE_IDPROFILE=:id)", nativeQuery = true)
    void deleteByListIdQuestion(@Param("id") Integer id);

    @Modifying
    @Transactional
    @Query(value = "delete from AnswerOptions  where QUESTION_IDQUESTION in" +
            " (select IDQUESTION from QUESTION where PROFILE_IDPROFILE in " +
            "(select IDPROFILE from  PROFILE where IDGROUPPROFILE=:id))", nativeQuery = true)
    void deleteByIdGroupProfile(@Param("id") Integer id);

}


