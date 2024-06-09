package com.backend.finalproject.repository;

import com.backend.finalproject.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpresaRepository extends JpaRepository<Empresa, Long>{
	
}
