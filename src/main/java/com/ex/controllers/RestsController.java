package com.ex.controllers;

import com.ex.dao.AnswerOptionsDao;
import com.ex.dao.GroupProfileDao;
import com.ex.dao.ProfileDao;
import com.ex.dao.QuestionDao;
import com.ex.entity.AnswerOptions;
import com.ex.entity.GroupOfProfiles;
import com.ex.entity.Profile;
import com.ex.entity.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Zdornov Maxim
 * @version 1.0
 */
@RestController
public class RestsController {
    @Autowired
    private GroupProfileDao groupProfileDao;

    @Autowired
    private ProfileDao profileDao;

    @Autowired
    private AnswerOptionsDao answerOptionsDao;

    @Autowired
    private QuestionDao questionDao;

    @RequestMapping(value = "/groupProfileGet", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<GroupOfProfiles> > groupProfileGet() {
        List<GroupOfProfiles> groupOfProfilesList = groupProfileDao.findIdAndTitle();
        return  ResponseEntity.ok().body(groupOfProfilesList);
    }

     @RequestMapping(value = {"/profileGet"},produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
     public ResponseEntity<List<Profile> > profileGet(GroupOfProfiles groupProfile) {
         List<Profile> profilesList = profileDao.findByIdGroupProfiles(groupProfile.getIdgroupOfProfiles());
         return  ResponseEntity.ok().body(profilesList);
    }

    @RequestMapping(value = "/questionGet", produces = MediaType.APPLICATION_JSON_UTF8_VALUE )
    public ResponseEntity<List<Question> > questionGet(Profile profile) {
        System.out.println(profile);
        List<Question> questionList = questionDao.findQuestionByIdProfile(profile.getIdProfile());
        System.out.println(questionList);
        return  ResponseEntity.ok().body(questionList);
    }

    @PostMapping(value = "/answerGet",  produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<AnswerOptions> > answerGet(Question question) {
        List<AnswerOptions> answerOptionsList = answerOptionsDao.findAnswerByIdQuestion(question.getIdQuestion());
        System.out.println(answerOptionsList);
        return  ResponseEntity.ok().body(answerOptionsList);
    }







}
