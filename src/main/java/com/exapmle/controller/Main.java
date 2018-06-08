package com.exapmle.controller;

import com.exapmle.domain.Message;
import com.exapmle.repos.MessageRepo;
//import com.sun.org.apache.xml.internal.dtm.ref.DTMDefaultBaseIterators;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;
@Controller
public class MainController {
    @Autowired

    private MessageRepo messageRepo;

    @GetMapping("/")
    public String greeting(
            Map<String, Object> model) {//ключ, значение
        return "welcome";
    }
    @GetMapping("/main")
    public String main (Map <String, Object > model){
        Iterable<Message> messages= messageRepo.findAll();
        model.put("messages", messages);
        return "main";
    }
    @PostMapping("/main")
    public String add (@RequestParam String text, @RequestParam String tag, Map <String, Object > model){
        Message message= new Message(text, tag);
        messageRepo.save(message);
        Iterable<Message> messages= messageRepo.findAll();
        model.put("messages", messages);
        return "main";
    }
    @PostMapping("filter")
    public String filter(@RequestParam String filter, Map<String, Object> model) {

        Iterable<Message> messages;

        if (filter != null && !filter.isEmpty()) {

//            messages = messageRepo.findByTag(filter);
            messages = messageRepo.findByText(filter);

        } else {
            messages = messageRepo.findAll();
        }

        model.put("messages", messages);

        return "main";
    }

    @GetMapping("/list")
    public String greeting() {
        return "index";
    }



}