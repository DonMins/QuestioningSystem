package com.ex.controllers;

import com.ex.dao.GroupProfileDao;
import com.ex.dao.UserDao;
import com.ex.entity.AnswerOptions;
import com.ex.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class SaveQuestionaryController {
    @Autowired
    private GroupProfileDao groupProfileDao;
    @Autowired
    private UserDao userDao;

    @RequestMapping(value = "/saveQuestionary")

    public void saveQuestionary(@RequestBody ArrayList<AnswerOptions> answerOptionsList ,  User user){
        Integer idUser = userDao.findByUsername(user.getUsername()).getId();
        for (AnswerOptions answerOptions : answerOptionsList) {
            userDao.saveAnswerUser(idUser, answerOptions.getIdAnswerOptions());
        }

    }

}
