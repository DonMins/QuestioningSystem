package com.ex.controllers;

import com.ex.dao.AnswerOptionsDao;
import com.ex.dao.QuestionDao;
import com.ex.entity.AnswerOptions;
import com.ex.entity.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AnswerController {

        @Autowired
        private AnswerOptionsDao answerOptionsDao;

        @Autowired
        private QuestionDao questionDao;


        @RequestMapping(value = {"/answerGet"}, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
        public ResponseEntity<List<AnswerOptions>> answerGet(Question question) {
            List<AnswerOptions> answerOptions = answerOptionsDao.findAnswerByIdQuestion(question.getIdQuestion());
            return ResponseEntity.ok().body(answerOptions);
        }

        @RequestMapping(value = "/saveAnswer", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
        public void saveAnswer(AnswerOptions answerOptions,  Question question ) {
            answerOptions.setQuestion(question);
            answerOptionsDao.save(answerOptions);
        }

       @RequestMapping(value = "/deleteAnswer", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
       public void deleteAnswer (AnswerOptions answerOptions) {
        answerOptionsDao.delete(answerOptions);
    }

    }
