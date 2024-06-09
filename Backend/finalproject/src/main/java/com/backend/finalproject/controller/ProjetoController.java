package com.backend.finalproject.controller;

import com.backend.finalproject.model.Projeto;
import com.backend.finalproject.service.ProjetoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projeto")
public class ProjetoController {
    @Autowired
    private ProjetoService projetoService;

    @PostMapping
    public Projeto save(@RequestBody Projeto projeto) {
        return projetoService.save(projeto);
    }

    @GetMapping
    public List<Projeto> findAll() {
        return projetoService.findAll();
    }

    @GetMapping("/empresa/{empresaId}")
    public List<Projeto> findByEmpresaId(@PathVariable Long empresaId) {
        return projetoService.findByEmpresaId(empresaId);
    }
}