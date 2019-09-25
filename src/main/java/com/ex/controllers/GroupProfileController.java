package com.ex.controllers;

import com.ex.dao.AnswerOptionsDao;
import com.ex.dao.GroupProfileDao;
import com.ex.dao.ProfileDao;
import com.ex.dao.QuestionDao;
import com.ex.entity.GroupOfProfiles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GroupProfileController {
    @Autowired
    private GroupProfileDao groupProfileDao;

    @Autowired
    private ProfileDao profileDao;

    @Autowired
    private QuestionDao questionDao;

    @Autowired
    private AnswerOptionsDao answerOptionsDao;


    @RequestMapping(value = "/groupProfileGet", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<GroupOfProfiles>> groupProfileGet() {
        List<GroupOfProfiles> groupOfProfilesList = groupProfileDao.findIdAndTitle();
        return ResponseEntity.ok().body(groupOfProfilesList);
    }

    @RequestMapping(value = "/saveGroupProfile", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void saveGroupProfile(GroupOfProfiles groupOfProfiles) {
        groupProfileDao.save(groupOfProfiles);
    }

    @RequestMapping(value = "/deleteGroupProfile", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void deleteGroupProfile(GroupOfProfiles groupOfProfiles ) {
        answerOptionsDao.deleteByIdGroupProfile(groupOfProfiles.getIdgroupOfProfiles());
        questionDao.deleteByIdGroupProfile(groupOfProfiles.getIdgroupOfProfiles());
        profileDao.deleteByIdGroupProfile(groupOfProfiles.getIdgroupOfProfiles());
        groupProfileDao.delete(groupOfProfiles);
    }
}
