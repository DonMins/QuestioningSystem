package com.ex.dao;

import com.ex.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface QuestionDao  extends JpaRepository<Question, Integer> {
    @Query("select u from Question u where u.profile.idProfile = :id")
    List<Question> findQuestionByIdProfile(@Param("id")Integer id);

    @Query("select u.idQuestion from Question u where u.profile.idProfile = :id")
    List<Integer> findIdQuestionByIdProfile(@Param("id")Integer id);

    @Query("select u.profile.idProfile from Question u where u.idQuestion = :id")
    Integer findIdProfileByIdQuestion(@Param("id")Integer id);

    @Modifying
    @Transactional
    @Query(value = "delete from Question  where PROFILE_IDPROFILE =:id", nativeQuery = true)
    void deleteByIdProfile(@Param("id")Integer id);

    @Modifying
    @Transactional
    @Query(value = "delete from Question  where PROFILE_IDPROFILE in(select IDPROFILE from  PROFILE where IDGROUPPROFILE=:id)", nativeQuery = true)
    void deleteByIdGroupProfile(@Param("id")Integer id);

}
