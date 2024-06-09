package com.backend.finalproject.repository;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import com.backend.finalproject.model.Empresa;

public interface EmpresaRepository extends CrudRepository<Empresa, Long> {
  @Query("select * from empresa")
  public List<Empresa> findAll();

  @Query("select * from empresa where nome = :nome")
  public Empresa findByNome(String nome);

  @Query("select * from empresa where cnpj = :cnpj")
  public Empresa findByCnpj(String cnpj);

  @Query("select * from empresa where email = :email")
  public Empresa findByEmail(String email);

  @Query("delete from empresa where nome = :nome")
  public Empresa deleteByNome(String nome);

  @Query("delete from empresa where cnpj = :cnpj")
  public Empresa deleteByCnpj(String cnpj);

  @Query("delete from empresa where email = :email")
  public Empresa deleteByEmail(String email);
}
