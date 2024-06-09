package com.backend.finalproject.controller;

import com.backend.finalproject.model.Empresa;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.backend.finalproject.repository.EmpresaRepository;

@RestController
@RequestMapping("/api/empresa")
public class EmpresaController {
    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    @PostMapping
    public Empresa findByNome(@RequestBody String nome) {
        return empresaRepository.findByNome(nome);
    }

    @GetMapping
    public List<Empresa> findAll() {
        return empresaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Empresa findById(@PathVariable Long id) {
        return empresaRepository.findById(id).get();
    }
}
