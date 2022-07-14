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
CREATE SCHEMA IF NOT EXISTS `node_store_db` DEFAULT CHARACTER SET utf8 ;
USE `node_store_db` ;

-- -----------------------------------------------------
-- Table `node_store_db`.`user_profile`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `node_store_db`.`user_profile` ;

CREATE TABLE IF NOT EXISTS `node_store_db`.`user_profile` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `node_store_db`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `node_store_db`.`user` ;

CREATE TABLE IF NOT EXISTS `node_store_db`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_profile_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_user_profile_idx` (`user_profile_id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  CONSTRAINT `fk_user_user_profile`
    FOREIGN KEY (`user_profile_id`)
    REFERENCES `node_store_db`.`user_profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `node_store_db`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `node_store_db`.`category` ;

CREATE TABLE IF NOT EXISTS `node_store_db`.`category` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `node_store_db`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `node_store_db`.`product` ;

CREATE TABLE IF NOT EXISTS `node_store_db`.`product` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `price` DECIMAL(15,2) NOT NULL,
  `description` TEXT NOT NULL,
  `brand` VARCHAR(125) NOT NULL,
  `quantity` INT UNSIGNED NOT NULL,
  `seller_id` INT UNSIGNED NOT NULL,
  `category_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_user1_idx` (`seller_id` ASC) VISIBLE,
  INDEX `fk_product_category1_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_user1`
    FOREIGN KEY (`seller_id`)
    REFERENCES `node_store_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `node_store_db`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `node_store_db`.`user_reviews_product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `node_store_db`.`user_reviews_product` ;

CREATE TABLE IF NOT EXISTS `node_store_db`.`user_reviews_product` (
  `user_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `score` TINYINT UNSIGNED NOT NULL,
  `review` TEXT NOT NULL,
  PRIMARY KEY (`user_id`, `product_id`),
  INDEX `fk_user_has_product_product1_idx` (`product_id` ASC) VISIBLE,
  INDEX `fk_user_has_product_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_product_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `node_store_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_product_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `node_store_db`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


insert into `node_store_db`.`user_profile` (name, description)
values 	('Consumer', 'Normal user with consumer intentions'),
		    ('Seller', 'User that sells products');
	
-- default password: 'password'
insert into `node_store_db`.`user` (user_profile_id, name, email, password)
values  ('1', 'consumer', 'consumer@email.com', '$2a$12$afAWO7p.FxdMMhFoSdMOU.xXV0/N429PVa9Lmlui5JMeJJjLevra6'),
		    ('2', 'seller', 'seller@email.com', '$2a$12$afAWO7p.FxdMMhFoSdMOU.xXV0/N429PVa9Lmlui5JMeJJjLevra6');

insert into `node_store_db`.`category` (name, description)
values  ('Electronics', 'Electronic devices'),
		    ('Cleaning', 'Products to clean objects or environments');

insert into `node_store_db`.`product` (name, price, description, brand, quantity, seller_id, category_id)
values  ('Cellphone', 599.45, 'a normal cellphone', 'Amazing Phone', 10, 2, 1),
        ('Television', 799.99, 'an amazing television!', 'Zony', 4, 2, 1),
        ('Soap', 9.99, 'it cleans everything!', 'All clear', 21, 2, 2),
        ('Shampoo', 8.99, 'clean hair', 'All clear', 30, 2, 2),
        ('Detergent', 4.99, 'clean all your plates!', 'Clear boss', 8, 2, 2);