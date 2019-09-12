package com.ex.dao;

import com.ex.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionDao  extends JpaRepository<Question, Integer> {
}
