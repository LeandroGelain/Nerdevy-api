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
CREATE SCHEMA IF NOT EXISTS `Nerdevy_database` DEFAULT CHARACTER SET utf8 ;
USE `Nerdevy_database` ;

-- -----------------------------------------------------
-- Table `Nerdevy_database`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Nerdevy_database`.`Users` (
  `idUsers` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `pwd` VARCHAR(45) NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `institution` VARCHAR(45) NOT NULL,
  `age` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `points_user` INT NOT NULL,
  PRIMARY KEY (`idUsers`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Nerdevy_database`.`Challenges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Nerdevy_database`.`Challenges` (
  `idChallenges` INT NOT NULL AUTO_INCREMENT,
  `category_challenge` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `description_challenge` VARCHAR(45) NOT NULL,
  `points` INT NOT NULL,
  PRIMARY KEY (`idChallenges`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Nerdevy_database`.`Face_group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Nerdevy_database`.`Face_group` (
  `idFace_group` INT NOT NULL AUTO_INCREMENT,
  `date` VARCHAR(45) NOT NULL,
  `theme` VARCHAR(45) NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idFace_group`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Nerdevy_database`.`Users_has_Challenges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Nerdevy_database`.`Users_has_Challenges` (
  `Users_idUsers` INT NOT NULL,
  `Challenges_idChallenges` INT NOT NULL,
  PRIMARY KEY (`Users_idUsers`, `Challenges_idChallenges`),
  INDEX `fk_Users_has_Challenges_Challenges1_idx` (`Challenges_idChallenges` ASC) VISIBLE,
  INDEX `fk_Users_has_Challenges_Users_idx` (`Users_idUsers` ASC) VISIBLE,
  CONSTRAINT `fk_Users_has_Challenges_Users`
    FOREIGN KEY (`Users_idUsers`)
    REFERENCES `Nerdevy_database`.`Users` (`idUsers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_Challenges_Challenges1`
    FOREIGN KEY (`Challenges_idChallenges`)
    REFERENCES `Nerdevy_database`.`Challenges` (`idChallenges`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Nerdevy_database`.`Users_has_Face_group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Nerdevy_database`.`Users_has_Face_group` (
  `Users_idUsers` INT NOT NULL,
  `Face_group_idFace_group` INT NOT NULL,
  PRIMARY KEY (`Users_idUsers`, `Face_group_idFace_group`),
  INDEX `fk_Users_has_Face_group_Face_group1_idx` (`Face_group_idFace_group` ASC) VISIBLE,
  INDEX `fk_Users_has_Face_group_Users1_idx` (`Users_idUsers` ASC) VISIBLE,
  CONSTRAINT `fk_Users_has_Face_group_Users1`
    FOREIGN KEY (`Users_idUsers`)
    REFERENCES `Nerdevy_database`.`Users` (`idUsers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_Face_group_Face_group1`
    FOREIGN KEY (`Face_group_idFace_group`)
    REFERENCES `Nerdevy_database`.`Face_group` (`idFace_group`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Nerdevy_database`.`Call_group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Nerdevy_database`.`Call_group` (
  `idCall_group` INT NOT NULL AUTO_INCREMENT,
  `date` VARCHAR(45) NOT NULL,
  `theme` VARCHAR(45) NOT NULL,
  `link` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCall_group`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Nerdevy_database`.`Competition_group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Nerdevy_database`.`Competition_group` (
  `idCompetition_group` INT NOT NULL AUTO_INCREMENT,
  `theme` VARCHAR(45) NOT NULL,
  `language` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCompetition_group`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Nerdevy_database`.`Users_has_Competition_group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Nerdevy_database`.`Users_has_Competition_group` (
  `Users_idUsers` INT NOT NULL,
  `Competition_group_idCompetition_group` INT NOT NULL,
  PRIMARY KEY (`Users_idUsers`, `Competition_group_idCompetition_group`),
  INDEX `fk_Users_has_Competition_group_Competition_group1_idx` (`Competition_group_idCompetition_group` ASC) VISIBLE,
  INDEX `fk_Users_has_Competition_group_Users1_idx` (`Users_idUsers` ASC) VISIBLE,
  CONSTRAINT `fk_Users_has_Competition_group_Users1`
    FOREIGN KEY (`Users_idUsers`)
    REFERENCES `Nerdevy_database`.`Users` (`idUsers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_Competition_group_Competition_group1`
    FOREIGN KEY (`Competition_group_idCompetition_group`)
    REFERENCES `Nerdevy_database`.`Competition_group` (`idCompetition_group`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Users_has_Call_group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Nerdevy_database`.`Users_has_Call_group` (
  `Users_idUsers` INT NOT NULL,
  `Call_group_idCall_group` INT NOT NULL,
  PRIMARY KEY (`Users_idUsers`, `Call_group_idCall_group`),
  INDEX `fk_Users_has_Call_group_Call_group1_idx` (`Call_group_idCall_group` ASC) VISIBLE,
  INDEX `fk_Users_has_Call_group_Users1_idx` (`Users_idUsers` ASC) VISIBLE,
  CONSTRAINT `fk_Users_has_Call_group_Users1`
    FOREIGN KEY (`Users_idUsers`)
    REFERENCES `Nerdevy_database`.`Users` (`idUsers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_Call_group_Call_group1`
    FOREIGN KEY (`Call_group_idCall_group`)
    REFERENCES `Nerdevy_database`.`Call_group` (`idCall_group`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
