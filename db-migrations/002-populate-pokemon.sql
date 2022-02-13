-- Password Teste@123*
-- Hash $2b$10$MpcVb/kpK2tFF215LYYvPOj.iKProZTFqW8Heut/hDVgLx6CIE032
-- Salt $2b$10$MpcVb/kpK2tFF215LYYvPO 

-- -----------------------------------------------------
-- Data for table `zombies`.`zombie`
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Data for table `pokemons`.`trainer`
-- -----------------------------------------------------
START TRANSACTION;
USE `pokemons`;
INSERT INTO `pokemons`.`trainer` (`id`, `nameReal`, `username`, `hash`, `email`, `pokemon1`, `energia`, `perfilPictureUrl`) VALUES (1, 'Thiago Danilo', 'BoltSheep', '$2b$10$MpcVb/kpK2tFF215LYYvPOj.iKProZTFqW8Heut/hDVgLx6CIE032', 'thidampe@gmail.com', 1, 5, NULL);

COMMIT;
