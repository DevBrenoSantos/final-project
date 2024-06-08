package com.backend.finalproject.repository;

import com.backend.finalproject.model.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjetoRepository extends JpaRepository<Projeto, Long>{
	
}
