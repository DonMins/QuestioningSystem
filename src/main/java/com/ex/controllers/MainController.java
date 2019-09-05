package com.ex.controllers;

import com.ex.dao.AnswerOptionsDao;
import com.ex.dao.ProfileDao;
import com.ex.dao.QuestionDao;
import com.ex.entity.Profile;
import com.ex.entity.User;
import com.ex.service.GeneralResources;
import com.ex.service.SecurityService;
import com.ex.service.UserService;
import com.ex.validator.UserValidator;
import org.json.JSONObject;
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

    private Long Id = 0L; // Id страницы на которой расположена текущая анкета


    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index(Model model) {
        List<Profile> profileList = profileDao.findAll();
        Map<Integer, String> map = new HashMap<>();

        for (Profile profile : profileList) {
            map.put(profile.getIdProfile(), profile.getNameProfile());
        }

        model.addAttribute("index", map);
        return "mainPage";
    }


    @RequestMapping(value = "/profile/{id}", method = RequestMethod.GET)
    public String profile(@PathVariable Long id) {
        GeneralResources generalResources = new GeneralResources();
        Id = id;
        return "profile";
    }

    @RequestMapping(value = "/profileGet", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public ResponseEntity<?> profileGet() throws IOException {
        List<Profile> profiles = profileDao.findByIdProfile(Id);

//       List<Question> questionList = questionDao.findAllByIdProfile(Id);

//       List<AnswerOptions> answerOptionsList = answerOptionsDao.findAllByIdProfile(Id);
//       System.out.println(answerOptionsList);

        JSONObject obj = new JSONObject();
        obj.put("ProfileData", profiles);
      //  obj.put("QuestionList", questionList);

        System.out.println(obj);

        return ResponseEntity.ok().body(obj.toString());
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
