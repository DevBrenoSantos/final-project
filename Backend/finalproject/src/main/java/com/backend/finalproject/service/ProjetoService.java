package com.backend.finalproject.service;

import com.backend.finalproject.model.Projeto;
import com.backend.finalproject.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjetoService {
    @Autowired
    private ProjetoRepository projetoRepository;

    public Projeto save(Projeto projeto) {
        return projetoRepository.save(projeto);
    }

    public List<Projeto> findAll() {
        return projetoRepository.findAll();
    }

    public List<Projeto> findByEmpresaId(Long id) {
        return projetoRepository.findAll().stream().filter(projeto -> projeto.getEmpresa().getId().equals(id)).toList();
    }
}