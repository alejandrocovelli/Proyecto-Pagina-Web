-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema paperUniverse
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema paperUniverse
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `paperUniverse` DEFAULT CHARACTER SET utf8 ;
USE `paperUniverse` ;

-- -----------------------------------------------------
-- Table `paperUniverse`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `paperUniverse`.`usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `contraseña` VARCHAR(255) NOT NULL,
  `tipo` INT NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `paperUniverse`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `paperUniverse`.`categoria` (
  `idCategoria` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCategoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `paperUniverse`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `paperUniverse`.`producto` (
  `idProducto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(255) NULL,
  `precio` INT NOT NULL,
  `precioMayorista` INT NOT NULL,
  `foto` TEXT NULL,
  `idCategoria` INT NOT NULL,
  PRIMARY KEY (`idProducto`),
  INDEX `fk_producto_categoria1_idx` (`idCategoria` ASC) VISIBLE,
  CONSTRAINT `fk_producto_categoria1`
    FOREIGN KEY (`idCategoria`)
    REFERENCES `paperUniverse`.`categoria` (`idCategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `paperUniverse`.`direccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `paperUniverse`.`direccion` (
  `idDireccion` INT NOT NULL AUTO_INCREMENT,
  `direccion` VARCHAR(45) NOT NULL,
  `ciudad` VARCHAR(45) NOT NULL,
  `barrio` VARCHAR(45) NOT NULL,
  `idUsuario` INT NOT NULL,
  PRIMARY KEY (`idDireccion`),
  INDEX `fk_direccion_usuario_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_direccion_usuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `paperUniverse`.`usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `paperUniverse`.`orden`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `paperUniverse`.`orden` (
  `idOrden` INT NOT NULL AUTO_INCREMENT,
  `estado` INT NOT NULL,
  `totalPago` INT NOT NULL,
  `idUsuario` INT NOT NULL,
  `idDireccion` INT NOT NULL,
  PRIMARY KEY (`idOrden`),
  INDEX `fk_orden_usuario1_idx` (`idUsuario` ASC) VISIBLE,
  INDEX `fk_orden_direccion1_idx` (`idDireccion` ASC) VISIBLE,
  CONSTRAINT `fk_orden_usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `paperUniverse`.`usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orden_direccion1`
    FOREIGN KEY (`idDireccion`)
    REFERENCES `paperUniverse`.`direccion` (`idDireccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `paperUniverse`.`ordenProducto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `paperUniverse`.`ordenProducto` (
  `idOrdenProducto` INT NOT NULL AUTO_INCREMENT,
  `cantidad` INT NOT NULL,
  `precioUnidad` INT NOT NULL,
  `valorTotal` INT NOT NULL,
  `idOrden` INT NOT NULL,
  `idProducto` INT NOT NULL,
  PRIMARY KEY (`idOrdenProducto`),
  INDEX `fk_ordenProducto_orden1_idx` (`idOrden` ASC) VISIBLE,
  INDEX `fk_ordenProducto_producto1_idx` (`idProducto` ASC) VISIBLE,
  CONSTRAINT `fk_ordenProducto_orden1`
    FOREIGN KEY (`idOrden`)
    REFERENCES `paperUniverse`.`orden` (`idOrden`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ordenProducto_producto1`
    FOREIGN KEY (`idProducto`)
    REFERENCES `paperUniverse`.`producto` (`idProducto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
