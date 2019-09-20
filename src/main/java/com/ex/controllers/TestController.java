package com.ex.controllers;

import com.ex.dao.GroupProfileDao;
import com.ex.dao.ProfileDao;
import com.ex.entity.GroupOfProfiles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.io.IOException;
import java.util.List;

@RestController
@EnableWebMvc
public class TestController {
    @Autowired
    private GroupProfileDao groupProfileDao;
    @Autowired
    private ProfileDao profileDao;

    @RequestMapping(value = "/test", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<GroupOfProfiles>> tests() throws IOException {
//        List<GroupOfProfiles> groupOfProfiles = groupProfileDao.findIdAndTitle();
        List<GroupOfProfiles> groupOfProfilesList = groupProfileDao.findIdAndTitle();
        System.out.println(groupOfProfilesList);
        return  ResponseEntity.ok().body(groupOfProfilesList);

    }

}
