package com.ex.controllers;

import com.ex.dao.AnswerOptionsDao;
import com.ex.dao.ProfileDao;
import com.ex.dao.QuestionDao;
import com.ex.entity.GroupOfProfiles;
import com.ex.entity.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProfileController {
    @Autowired
    private ProfileDao profileDao;

    @Autowired
    private QuestionDao questionDao;

    @Autowired
    private AnswerOptionsDao answerOptionsDao;


    @RequestMapping(value = {"/profileGet"}, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<Profile>> profileGet(GroupOfProfiles groupProfile) {
        List<Profile> profilesList = profileDao.findByIdGroupProfiles(groupProfile.getIdgroupOfProfiles());
        return ResponseEntity.ok().body(profilesList);
    }

    @RequestMapping(value = "/saveProfile", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void saveProfile(Profile profiles,  GroupOfProfiles groupOfProfiles ) {
        profiles.setGroupOfProfiles(groupOfProfiles);
        profileDao.save(profiles);
    }

    @RequestMapping(value = "/deleteProfile", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void deleteProfile(Profile profiles ) {
        answerOptionsDao.deleteByListIdQuestion(profiles.getIdProfile());
        questionDao.deleteByIdProfile(profiles.getIdProfile());
        profileDao.delete(profiles);

    }
}
