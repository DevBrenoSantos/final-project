package com.backend.finalproject.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import com.backend.finalproject.model.Projeto;

public interface ProjetoRepository extends CrudRepository<Projeto, Long>{
    @Query("select * from projeto")
    public List<Projeto> findAll();
    
    @Query("select * from projeto where nome = :nome")
    public Projeto findByNome(String nome);

    @Query("select * from projeto where empresa_id = :empresaId")
    public List<Projeto> findByEmpresaId(Long empresaId);

    @Query("select * from projeto where id = :id")
    public Optional<Projeto> findById(Long id);

    @Query("delete from projeto where nome = :nome")
    public Projeto deleteByNome(String nome);

    @Query("delete from projeto where id = :id")
    public void deleteById(Long id);

    @Query("delete from projeto where empresa_id = :empresaId")
    public Projeto deleteByEmpresaId(Long empresaId);
}