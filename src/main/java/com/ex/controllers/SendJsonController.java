package com.ex.controllers;

import com.ex.dao.GroupProfileDao;
import com.ex.dao.ProfileDao;
import com.ex.entity.GroupOfProfiles;
import com.ex.entity.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

/**
 * @author Zdornov Maxim
 * @version 1.0
 */
@RestController
public class SendJsonController {
    @Autowired
    private GroupProfileDao groupProfileDao;

    @Autowired
    private ProfileDao profileDao;

    @RequestMapping(value = "/groupProfileGet", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<GroupOfProfiles> > groupProfileGet() throws IOException {
        List<GroupOfProfiles> groupOfProfilesList = groupProfileDao.findIdAndTitle();

        List<Profile> profilesList = profileDao.findByIdGroupProfiles(1);
        System.out.println(profilesList);

        return  ResponseEntity.ok().body(groupOfProfilesList);
    }

    @RequestMapping(value = "/profileGet", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<Profile> > profileGet() throws IOException {
        List<Profile> profilesList = profileDao.findByIdGroupProfiles(1);
        System.out.println(profilesList);
        return  ResponseEntity.ok().body(profilesList);
    }



}
