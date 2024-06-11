PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS empresa (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    nome     TEXT    NOT NULL,
    cnpj     TEXT    NOT NULL,
    email    TEXT    NOT NULL,
    password TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS projeto (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    nome       TEXT    NOT NULL,
    descricao  TEXT    NOT NULL,
    empresa_id INTEGER NOT NULL,
    FOREIGN KEY (
        empresa_id
    )
    REFERENCES empresa (id)
);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
