CREATE TABLE IF NOT EXISTS usuario (
  idUsuario INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(45) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  contrasena VARCHAR(255) NOT NULL,
  tipo INT NOT NULL,
  PRIMARY KEY (idUsuario),
  UNIQUE INDEX correo_UNIQUE (correo ASC)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS categoria (
  idCategoria INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(45) NOT NULL,
  PRIMARY KEY (idCategoria)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS producto (
  idProducto INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(255) NULL,
  precio INT NOT NULL,
  precioMayorista INT NOT NULL,
  foto TEXT NULL,
  idCategoria INT NOT NULL,
  PRIMARY KEY (idProducto),
  INDEX fk_producto_categoria1_idx (idCategoria ASC),
  CONSTRAINT fk_producto_categoria1 FOREIGN KEY (idCategoria)
    REFERENCES categoria (idCategoria)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS direccion (
  idDireccion INT NOT NULL AUTO_INCREMENT,
  direccion VARCHAR(45) NOT NULL,
  ciudad VARCHAR(45) NOT NULL,
  barrio VARCHAR(45) NOT NULL,
  idUsuario INT NOT NULL,
  PRIMARY KEY (idDireccion),
  INDEX fk_direccion_usuario_idx (idUsuario ASC),
  CONSTRAINT fk_direccion_usuario FOREIGN KEY (idUsuario)
    REFERENCES usuario (idUsuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS orden (
  idOrden INT NOT NULL AUTO_INCREMENT,
  estado INT NOT NULL,
  totalPago INT NOT NULL,
  idUsuario INT NOT NULL,
  idDireccion INT NULL,
  PRIMARY KEY (idOrden),
  INDEX fk_orden_usuario1_idx (idUsuario ASC),
  INDEX fk_orden_direccion1_idx (idDireccion ASC),
  CONSTRAINT fk_orden_usuario1 FOREIGN KEY (idUsuario)
    REFERENCES usuario (idUsuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_orden_direccion1 FOREIGN KEY (idDireccion)
    REFERENCES direccion (idDireccion)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS ordenProducto (
  idOrdenProducto INT NOT NULL AUTO_INCREMENT,
  cantidad INT NOT NULL,
  precioUnidad INT NOT NULL,
  valorTotal INT NOT NULL,
  idOrden INT NOT NULL,
  idProducto INT NOT NULL,
  PRIMARY KEY (idOrdenProducto),
  INDEX fk_ordenProducto_orden1_idx (idOrden ASC),
  INDEX fk_ordenProducto_producto1_idx (idProducto ASC),
  CONSTRAINT fk_ordenProducto_orden1 FOREIGN KEY (idOrden)
    REFERENCES orden (idOrden)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_ordenProducto_producto1 FOREIGN KEY (idProducto)
    REFERENCES producto (idProducto)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;
