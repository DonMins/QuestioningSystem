package com.ex.controllers;

import com.ex.dao.QuestionDao;
import com.ex.entity.Profile;
import com.ex.entity.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class QuestionController {

    @Autowired
    private QuestionDao questionDao;

    @RequestMapping(value = "/questionGet", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<Question>> questionGet(Profile profile) {
        System.out.println(profile);
        List<Question> questionList = questionDao.findQuestionByIdProfile(profile.getIdProfile());
        return ResponseEntity.ok().body(questionList);
    }

    @RequestMapping(value = "/saveQuestion", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void saveQuestion(Question question , Profile profiles) {
        question.setProfile(profiles);
        questionDao.save(question);
    }

}
