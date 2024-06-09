package com.backend.finalproject.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import com.backend.finalproject.model.Empresa;

public interface EmpresaRepository extends CrudRepository<Empresa, Long> {
  @Query("select * from empresa where nome = :nome")
  Empresa findByNome(String nome);

  @Query("select * from empresa where cnpj = :cnpj")
  Empresa findByCnpj(String cnpj);

  @Query("select * from empresa where email = :email")
  Empresa findByEmail(String email);
}
