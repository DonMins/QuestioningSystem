package com.ex.controllers;

import com.ex.dao.AnswerOptionsDao;
import com.ex.dao.GroupProfileDao;
import com.ex.dao.ProfileDao;
import com.ex.dao.QuestionDao;
import com.ex.entity.GroupOfProfiles;
import com.ex.entity.User;
import com.ex.service.GeneralResources;
import com.ex.service.SecurityService;
import com.ex.service.UserService;
import com.ex.validator.UserValidator;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ArrayNode;
import org.codehaus.jackson.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Zdornov Maxim
 * @version 1.0
 */
@Controller
public class MainController {

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private UserService userService;

    @Autowired
    private ProfileDao profileDao;

    @Autowired
    private QuestionDao questionDao;

    @Autowired
    private AnswerOptionsDao answerOptionsDao;

    @Autowired
    private GroupProfileDao groupProfileDao;


    @RequestMapping(value = {"/", "/GroupOfProfile"}, method = RequestMethod.GET)
    public String GroupOfProfile(Model model) {
        List<GroupOfProfiles> groupOfProfiles = groupProfileDao.findAll();
        Map<Integer, String> map = new HashMap<>();

        for (GroupOfProfiles groupProfile : groupOfProfiles) {
            map.put(groupProfile.getIdgroupOfProfiles(), groupProfile.getTitle());
        }

        model.addAttribute("GroupOfProfile", map);
        return "mainPage";
    }


    @RequestMapping(value = "/profile/{id}", method = RequestMethod.GET)
    public String profile(@PathVariable Long id) {
        GeneralResources generalResources = new GeneralResources();
         return "profile";
    }

    @RequestMapping(value = "/profileGet", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public ResponseEntity<?> profileGet() throws IOException {
        List<GroupOfProfiles> groupOfProfiles = groupProfileDao.findAll();

        ObjectMapper mapper = new ObjectMapper();
        ArrayNode arrayNode = mapper.createArrayNode();
        ObjectNode rootNode = mapper.createObjectNode();

        for (int i =0; i<groupOfProfiles.size();i++) {
            List<String> profileList = profileDao.findByIdGroup(groupOfProfiles.get(i).getIdgroupOfProfiles());
            System.out.println(profileList.get(0));


            ObjectNode childNode1 = mapper.createObjectNode();
            childNode1.put("idgroupOfProfiles", groupOfProfiles.get(i).getIdgroupOfProfiles());
            childNode1.put("title", groupOfProfiles.get(i).getTitle());

            ArrayNode arrayNode2 = mapper.createArrayNode();

            for (int j = 0; j < profileList.size(); j++) {
                ObjectNode childNode2 = mapper.createObjectNode();
                childNode2.put("idProfile", j);
                childNode2.put("name", profileList.get(j));
                arrayNode2.add(childNode2);
            }
            childNode1.put("nameProfile", arrayNode2);
            arrayNode.add(childNode1);
        }

          rootNode.put("GroupOfProfiles", arrayNode);

        String jsonString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(rootNode);
        System.out.println(jsonString);

        return ResponseEntity.ok().body(jsonString);
    }

    @RequestMapping(value = "/registration", method = RequestMethod.GET)
    public String registration(Model model) {
        model.addAttribute("userForm", new User());
        return "registration";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(Model model, String error, String logout) {
        if (error != null) {
            model.addAttribute("error", "Имя пользователя или пароль неверны");
        }
        if (logout != null) {
            model.addAttribute("message", "Вышли успешно");
            return "redirect:/login";
        }
        return "login";
    }

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public String registration(@ModelAttribute("userForm") User userForm, BindingResult bindingResult, Model model) throws UnsupportedEncodingException {
        userValidator.validate(userForm, bindingResult);
        if (bindingResult.hasErrors()) {
            return "registration";
        }
        userService.save(userForm);

        securityService.autoLogin(userForm.getUsername(), userForm.getConfirmPassword());

        return "redirect:/index";
    }
}
