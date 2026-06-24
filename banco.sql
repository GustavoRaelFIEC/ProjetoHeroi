CREATE DATABASE IF NOT EXISTS portal_herois_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE portal_herois_db;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  coins INT UNSIGNED NOT NULL DEFAULT 100,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_usuarios_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS guildas (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(120) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_guildas_nome (nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS herois (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(120) NOT NULL,
  classe ENUM('Mago', 'Guerreiro', 'Arqueiro', 'Ladino') NOT NULL,
  nivel_poder TINYINT UNSIGNED NOT NULL,
  avatar_url VARCHAR(500) NOT NULL,
  usuario_id INT NOT NULL,
  guilda_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_herois_usuario_id (usuario_id),
  KEY idx_herois_guilda_id (guilda_id),
  CONSTRAINT chk_herois_nivel_poder CHECK (nivel_poder BETWEEN 0 AND 100),
  CONSTRAINT fk_herois_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_herois_guilda
    FOREIGN KEY (guilda_id) REFERENCES guildas (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS missoes (
  id INT NOT NULL AUTO_INCREMENT,
  descricao VARCHAR(255) NOT NULL,
  status ENUM('Em andamento', 'Concluída', 'Falhou') NOT NULL,
  recompensa_ouro INT UNSIGNED NOT NULL,
  heroi_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_missoes_heroi_id (heroi_id),
  CONSTRAINT fk_missoes_heroi
    FOREIGN KEY (heroi_id) REFERENCES herois (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO guildas (nome) VALUES
  ('Ordem Ciano'),
  ('Forja Amber'),
  ('Conclave Pink'),
  ('Sentinelas Slate')
ON DUPLICATE KEY UPDATE nome = VALUES(nome);
