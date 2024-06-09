package com.backend.finalproject.repository;

import com.backend.finalproject.model.Empresa;

import jakarta.persistence.Table;

import org.springframework.data.jpa.repository.JpaRepository;

@Table(name = "empresa")
public interface EmpresaRepository extends JpaRepository<Empresa, Long>{
	
}