-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `NerdevyDatabase` DEFAULT CHARACTER SET utf8 ;
USE `NerdevyDatabase` ;

-- -----------------------------------------------------
-- Table `NerdevyDatabase`.`Friends`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `NerdevyDatabase`.`Friends` (
  `idFriends` INT NOT NULL,
  `idUsersFriend` INT NOT NULL,
  PRIMARY KEY (`idFriends`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `NerdevyDatabase`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `NerdevyDatabase`.`Users` (
  `idUsers` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `pwd` LONGTEXT NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `institution` VARCHAR(45) NOT NULL,
  `born_date` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `points_user` INT NOT NULL,
  `created_date` VARCHAR(45) NOT NULL,
  `img_path` MEDIUMTEXT NULL,
  `bio` LONGTEXT NULL,
  `gitlabProfile` VARCHAR(100) NULL,
  `githubProfile` VARCHAR(100) NULL,
  `Friends_idFriends` INT NULL,
  PRIMARY KEY (`idUsers`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  INDEX `fk_Users_Friends1_idx` (`Friends_idFriends` ASC) VISIBLE,
  CONSTRAINT `fk_Users_Friends1`
    FOREIGN KEY (`Friends_idFriends`)
    REFERENCES `NerdevyDatabase`.`Friends` (`idFriends`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `NerdevyDatabase`.`Cards`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `NerdevyDatabase`.`Cards` (
  `idCard` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `points` INT NOT NULL,
  `create_by` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idCard`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`MembersCard`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `NerdevyDatabase`.`MembersCard` (
  `Users_idUsers` INT NOT NULL,
  `Cards_idCard` INT NOT NULL,
  PRIMARY KEY (`Users_idUsers`, `Cards_idCard`),
  INDEX `fk_Users_has_Challenges_Challenges1_idx` (`Cards_idCard` ASC) VISIBLE,
  INDEX `fk_Users_has_Challenges_Users_idx` (`Users_idUsers` ASC) VISIBLE,
  CONSTRAINT `fk_Users_has_Challenges_Users`
    FOREIGN KEY (`Users_idUsers`)
    REFERENCES `NerdevyDatabase`.`Users` (`idUsers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_Challenges_Challenges1`
    FOREIGN KEY (`Cards_idCard`)
    REFERENCES `NerdevyDatabase`.`Cards` (`idCard`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
