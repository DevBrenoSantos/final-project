package com.backend.finalproject.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sessao")
public class SessaoController {
  @PostMapping("/logar")
  public String logar() {
    return "login";
  }


  @GetMapping("/deslogar")
  public String deslogar() {
    return "logout";
  }
}
