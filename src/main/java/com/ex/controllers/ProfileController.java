package com.ex.controllers;

import com.ex.dao.ProfileDao;
import com.ex.dao.QuestionDao;
import com.ex.entity.GroupOfProfiles;
import com.ex.entity.Profile;
import com.ex.entity.Question;
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
        List<Question> questionList = questionDao.findQuestionByIdProfile(profiles.getIdProfile());
        if (questionList.size()==0){
            profileDao.delete(profiles);
        }
        else{

        }
    }
}
