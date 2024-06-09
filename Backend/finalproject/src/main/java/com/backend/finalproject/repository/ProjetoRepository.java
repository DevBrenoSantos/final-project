package com.backend.finalproject.repository;

import com.backend.finalproject.model.Projeto;

import jakarta.persistence.Table;

import org.springframework.data.jpa.repository.JpaRepository;

@Table(name = "projeto")
public interface ProjetoRepository extends JpaRepository<Projeto, Long>{
	
}