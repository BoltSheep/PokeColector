SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema pokemon
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `pokemons` ;
CREATE SCHEMA IF NOT EXISTS `pokemons` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `pokemons` ;

-- -----------------------------------------------------
-- Table `pokemons`.`pokemon`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pokemons`.`pokemon` ;

CREATE TABLE IF NOT EXISTS `pokemons`.`pokemon` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `type1` VARCHAR(45) NOT NULL,
  `type2` VARCHAR(45) NULL,
  `pictureUrl` VARCHAR(200) NULL,
  `description` VARCHAR(8192) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pokemons`.`trainer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pokemons`.`trainer` ;

CREATE TABLE IF NOT EXISTS `pokemons`.`trainer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nameReal` VARCHAR(80) NULL,
  `username` VARCHAR(45) NOT NULL,
  `hash`     VARCHAR(250) NOT NULL,
  `email`    VARCHAR(150) NOT NULL,
  `pokemon1` INT NULL,
  `pokemon2` INT NULL,
  `pokemon3` INT NULL,
  `pokemon4` INT NULL,
  `pokemon5` INT NULL,
  `pokemon6` INT NULL,
  `energia`  INT NOT NULL,
  `perfilPictureUrl` VARCHAR(250) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

