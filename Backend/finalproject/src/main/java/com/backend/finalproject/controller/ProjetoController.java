package com.backend.finalproject.controller;

import com.backend.finalproject.model.Projeto;
import com.backend.finalproject.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projeto")
public class ProjetoController {
    @Autowired
    private ProjetoRepository projetoRepository;

    @PostMapping
    public Projeto findByNome(@RequestBody String nome) {
        return projetoRepository.findByNome(nome);
    }

    @GetMapping
    public List<Projeto> findAll() {
        return projetoRepository.findAll();
    }

    @GetMapping("/empresa/{empresaId}")
    public List<Projeto> findByEmpresaId(@PathVariable Long empresaId) {
        return projetoRepository.findByEmpresaId(empresaId);
    }
}