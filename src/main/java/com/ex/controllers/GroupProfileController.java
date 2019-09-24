package com.ex.controllers;

import com.ex.dao.GroupProfileDao;
import com.ex.dao.ProfileDao;
import com.ex.entity.GroupOfProfiles;
import com.ex.entity.Profile;
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
        List<Profile> profilesList = profileDao.findByIdGroupProfiles(groupOfProfiles.getIdgroupOfProfiles());
        if (profilesList.size()==0){
            groupProfileDao.delete(groupOfProfiles);
        }
        else{
            profileDao.deleteByIdGroupProfile(groupOfProfiles.getIdgroupOfProfiles());
            groupProfileDao.delete(groupOfProfiles);
        }
    }
}
