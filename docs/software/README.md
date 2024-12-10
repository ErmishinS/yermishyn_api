# Реалізація інформаційного та програмного забезпечення


## SQL-скрипт для створення початкового наповнення бази даних

```sql


-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema media_system
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `media_system` ;

-- -----------------------------------------------------
-- Schema media_system
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `media_system` DEFAULT CHARACTER SET utf8 ;
USE `media_system` ;

-- -----------------------------------------------------
-- Table `media_system`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `media_system`.`User` ;

CREATE TABLE IF NOT EXISTS `media_system`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `media_system`.`MediaContent`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `media_system`.`MediaContent` ;

CREATE TABLE IF NOT EXISTS `media_system`.`MediaContent` (
  `id` INT NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  `body` VARCHAR(255) NOT NULL,
  `content_type` VARCHAR(45) NOT NULL,
  `created_at` DATE NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_MediaContent_User1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_MediaContent_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `media_system`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `media_system`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `media_system`.`Role` ;

CREATE TABLE IF NOT EXISTS `media_system`.`Role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `media_system`.`Permission`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `media_system`.`Permission` ;

CREATE TABLE IF NOT EXISTS `media_system`.`Permission` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `media_system`.`RolePermission`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `media_system`.`RolePermission` ;

CREATE TABLE IF NOT EXISTS `media_system`.`RolePermission` (
  `role_id` INT NOT NULL,
  `permission_id` INT NOT NULL,
  PRIMARY KEY (`role_id`, `permission_id`),
  INDEX `fk_RolePermission_Permission1_idx` (`permission_id` ASC) VISIBLE,
  CONSTRAINT `fk_RolePermission_Role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `media_system`.`Role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_RolePermission_Permission1`
    FOREIGN KEY (`permission_id`)
    REFERENCES `media_system`.`Permission` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `media_system`.`AnalysisReport`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `media_system`.`AnalysisReport` ;

CREATE TABLE IF NOT EXISTS `media_system`.`AnalysisReport` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `body` VARCHAR(255) NOT NULL,
  `created_at` DATE NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_AnalysisReport_User1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_AnalysisReport_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `media_system`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `media_system`.`AnalysisResult`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `media_system`.`AnalysisResult` ;

CREATE TABLE IF NOT EXISTS `media_system`.`AnalysisResult` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  `body` VARCHAR(255) NOT NULL,
  `created_at` DATE NOT NULL,
  `analysisReport_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `analysisReport_id`, `user_id`),
  INDEX `fk_AnalysisResult_AnalysisReport1_idx` (`analysisReport_id` ASC) VISIBLE,
  INDEX `fk_AnalysisResult_User1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_AnalysisResult_AnalysisReport1`
    FOREIGN KEY (`analysisReport_id`)
    REFERENCES `media_system`.`AnalysisReport` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_AnalysisResult_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `media_system`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `media_system`.`MediaContentAnalysisResult`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `media_system`.`MediaContentAnalysisResult` ;

CREATE TABLE IF NOT EXISTS `media_system`.`MediaContentAnalysisResult` (
  `mediaContent_id` INT NOT NULL,
  `analysisResult_id` INT NOT NULL,
  PRIMARY KEY (`mediaContent_id`, `analysisResult_id`),
  INDEX `fk_MediaContentAnalysisResult_AnalysisResult1_idx` (`analysisResult_id` ASC) VISIBLE,
  CONSTRAINT `fk_MediaContentAnalysisResult_MediaContent1`
    FOREIGN KEY (`mediaContent_id`)
    REFERENCES `media_system`.`MediaContent` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_MediaContentAnalysisResult_AnalysisResult1`
    FOREIGN KEY (`analysisResult_id`)
    REFERENCES `media_system`.`AnalysisResult` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `media_system`.`Tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `media_system`.`Tag` ;

CREATE TABLE IF NOT EXISTS `media_system`.`Tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `media_system`.`AnalysisResultTag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `media_system`.`AnalysisResultTag` ;

CREATE TABLE IF NOT EXISTS `media_system`.`AnalysisResultTag` (
  `analysisResult_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`analysisResult_id`, `tag_id`),
  INDEX `fk_AnalysisResultTag_Tag1_idx` (`tag_id` ASC) VISIBLE,
  CONSTRAINT `fk_AnalysisResultTag_AnalysisResult1`
    FOREIGN KEY (`analysisResult_id`)
    REFERENCES `media_system`.`AnalysisResult` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_AnalysisResultTag_Tag1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `media_system`.`Tag` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `media_system`.`Source`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `media_system`.`Source` ;

CREATE TABLE IF NOT EXISTS `media_system`.`Source` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `url` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `media_system`.`SourceTag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `media_system`.`SourceTag` ;

CREATE TABLE IF NOT EXISTS `media_system`.`SourceTag` (
  `tag_id` INT NOT NULL,
  `source_id` INT NOT NULL,
  PRIMARY KEY (`tag_id`, `source_id`),
  INDEX `fk_SourceTag_Source1_idx` (`source_id` ASC) VISIBLE,
  CONSTRAINT `fk_SourceTag_Tag1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `media_system`.`Tag` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SourceTag_Source1`
    FOREIGN KEY (`source_id`)
    REFERENCES `media_system`.`Source` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `media_system`.`MediaContentTag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `media_system`.`MediaContentTag` ;

CREATE TABLE IF NOT EXISTS `media_system`.`MediaContentTag` (
  `tag_id` INT NOT NULL,
  `mediaContent_id` INT NOT NULL,
  PRIMARY KEY (`tag_id`, `mediaContent_id`),
  INDEX `fk_MediaContentTag_MediaContent1_idx` (`mediaContent_id` ASC) VISIBLE,
  CONSTRAINT `fk_MediaContentTag_Tag1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `media_system`.`Tag` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_MediaContentTag_MediaContent1`
    FOREIGN KEY (`mediaContent_id`)
    REFERENCES `media_system`.`MediaContent` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `media_system`.`MediaContentSource`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `media_system`.`MediaContentSource` ;

CREATE TABLE IF NOT EXISTS `media_system`.`MediaContentSource` (
  `source_id` INT NOT NULL,
  `mediaContent_id` INT NOT NULL,
  PRIMARY KEY (`source_id`, `mediaContent_id`),
  INDEX `fk_MediaContentSource_MediaContent1_idx` (`mediaContent_id` ASC) VISIBLE,
  CONSTRAINT `fk_MediaContentSource_Source1`
    FOREIGN KEY (`source_id`)
    REFERENCES `media_system`.`Source` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_MediaContentSource_MediaContent1`
    FOREIGN KEY (`mediaContent_id`)
    REFERENCES `media_system`.`MediaContent` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `media_system`.`UserRole`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `media_system`.`UserRole` ;

CREATE TABLE IF NOT EXISTS `media_system`.`UserRole` (
  `user_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
  INDEX `fk_UserRole_Role1_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_UserRole_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `media_system`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_UserRole_Role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `media_system`.`Role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `media_system`.`AnalysisReportTag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `media_system`.`AnalysisReportTag` ;

CREATE TABLE IF NOT EXISTS `media_system`.`AnalysisReportTag` (
  `analysisReport_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`analysisReport_id`, `tag_id`),
  INDEX `fk_AnalysisReportTag_Tag1_idx` (`tag_id` ASC) VISIBLE,
  CONSTRAINT `fk_AnalysisReportTag_AnalysisReport1`
    FOREIGN KEY (`analysisReport_id`)
    REFERENCES `media_system`.`AnalysisReport` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_AnalysisReportTag_Tag1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `media_system`.`Tag` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- Fill database with data
USE media_system

START TRANSACTION;

-- User table
INSERT INTO User (id, first_name, last_name, email, password) VALUES 
(1, 'Vladyslav', 'Sokolov', 'pppvladsok@gmail.com', 'vlada1976'),
(2, 'John', 'Doe', 'john.doe2000@gmail.com', '756433456'),
(3, 'Veronica', 'Shevchenko', 'lapamapa@ukr.net', 'geog21224'),
(4, 'Fiona', 'Martinez', 'fiona.martinez2@gmail.com', 'fieNa231'),
(5, 'Bob', 'Brown', 'cliriks@gmail.com', 'mamaaa1945'),
(6, 'David', 'Soloh', 'davasolom@gmail.com', 'timetorest'),
(7, 'Sergey', 'Semenyaka', 's.semenyaka@gmail.com', 'bazovichok222'),
(8, 'Anastasia', 'Golovchenko', 'ddd.anasnata@gmail.com', 'adacjavasj2'),
(9, 'Elena', 'Kovalenko', 'elena.kovalenko@gmail.com', 'kovalenko88'),
(10, 'Alex', 'Petrenko', 'alex.petr@yahoo.com', 'alexpass123');

-- Role table
INSERT INTO Role (id, name, description) VALUES
(1, 'User', 'An ordinary user of the system'),
(2, 'TechnicalExpert', 'Specialist in technical issues');

-- Permisson table
INSERT INTO Permission (id, name) VALUES
(1, 'user.role.promote'),
(2, 'user.delete'),
(3, 'content.create'),
(4, 'content.search'),
(5, 'content.update'),
(6, 'content.delete');

-- Tag table
INSERT INTO Tag (id, name) VALUES
(1, 'Science'),
(2, 'Technology'),
(3, 'Health'),
(4, 'Travel'),
(5, 'Environment'),
(6, 'Space Exploration'),
(7, 'Quantum Computing'),
(8, 'Renewable Energy'),
(9, 'Gaming'),
(10, 'Medicine'),
(11, 'Market Analysis'),
(12, 'Customer Insights'),
(13, 'Product Launch'),
(14, 'Sales Projections'),
(15, 'Employee Feedback'),
(16, 'Social Media'),
(17, 'Competitor Analysis'),
(18, 'Logistics'),
(19, 'User Experience');

-- Source table
INSERT INTO Source (id, name, url) VALUES
(1, 'National Geographic', 'https://www.nationalgeographic.com'),
(2, 'TechCrunch', 'https://techcrunch.com'),
(3, 'NASA', 'https://www.nasa.gov'),
(4, 'Healthline', 'https://www.healthline.com'),
(5, 'Quanta Magazine', 'https://www.quantamagazine.org'),
(6, 'TripAdvisor', 'https://www.tripadvisor.com'),
(7, 'YouTube', 'https://www.youtube.com'),
(8, 'GameSpot', 'https://www.gamespot.com'),
(9, 'PlayStation Blog', 'https://blog.playstation.com'),
(10, 'MedTech News', 'https://www.medtechnews.com');

-- MediaContent table
INSERT INTO MediaContent (`id`, `title`, `description`, `body`, `content_type`, `created_at`, `user_id`) VALUES
(1, 'Exploring the Ocean Depths', 'A comprehensive dive into the mysteries of the deep sea.', 'The ocean s depths hold secrets yet to be uncovered, from bioluminescent creatures to uncharted trenches. This exploration reveals the enigmatic wonders beneath the waves.', 'Article', '2024-11-01', 1),
(2, 'Advancements in AI', 'Recent breakthroughs in artificial intelligence technology.', 'AI advancements are reshaping our world, from smart assistants to autonomous vehicles. Cutting-edge algorithms and deep learning are driving this technological revolution.', 'Article', '2024-11-02', 2),
(3, 'History of Space Exploration', 'From the Moon landing to Mars missions.', 'https://youtu.be/3JuKR7jf46o?si=-eG_l82dAemgaZdW', 'Video', '2024-11-03', 3),
(4, 'Healthy Living Tips', 'Simple steps to improve your health and wellbeing.', 'https://www.healthline.com/health/how-to-maintain-a-healthy-lifestyle', 'Blog Post', '2024-11-04', 4),
(5, 'Understanding Quantum Computing', 'An introduction to the principles of quantum computing.', 'Quantum computing harnesses the power of quantum mechanics to process information in fundamentally new ways, promising exponential advances in speed and problem-solving capabilities.', 'Article', '2024-11-05', 5),
(6, 'Top 25 Travel Destinations', 'A list of must-visit places around the world.', 'https://www.tripadvisor.com/TravelersChoice-Destinations-cTop-g1', 'Blog Post', '2024-12-06', 6),
(7, 'The Future of Renewable Energy', 'How renewable energy sources are shaping our future.', 'https://youtu.be/zZheOMvPWGc?si=3C6qQHf-jUApOgB0', 'Video', '2024-12-07', 7),
(8, 'Cyberpunk Cityscape', 'A futuristic city teeming with life, neon lights, and advanced technology, showcasing a blend of high-rise buildings, flying cars, and bustling streets.', 'https://www.gamespot.com/a/uploads/original/1179/11799911/4363244-cyberpunk1.jpg', 'Image', '2024-12-08', 8),
(9, 'Epic Battle in Snowy Terrain', 'An intense battle between a warrior and a fierce opponent in a frozen, mountainous landscape.', 'https://blog.playstation.com/tachyon/2024/09/c31c0e1cae38ef6a23c353e31d87e8b1cd57b700.jpeg', 'Image', '2024-12-09', 9),
(10, 'Innovations in Healthcare', 'New technologies improving patient care.', 'Healthcare innovations like telemedicine and personalized treatments are revolutionizing patient care, enhancing accessibility, and improving outcomes for various medical conditions.', 'Article', '2024-12-10', 10);

-- AnalysisReport table
INSERT INTO AnalysisReport (`id`, `title`, `body`, `created_at`, `user_id`) VALUES 
(1, 'Quarterly Performance Analysis', 'In-depth analysis of quarterly performance.', '2024-01-01', 1),
(2, 'Market Trend Report', 'Overview of market trends for the current quarter.', '2024-01-02', 2),
(3, 'Customer Feedback Summary', 'Compilation of recent customer feedback.', '2024-01-03', 1),
(4, 'Product Launch Analysis', 'Analysis of the latest product launch success.', '2024-01-04', 3),
(5, 'Annual Revenue Forecast', 'Forecast based on historical data and market trends.', '2024-01-05', 2),
(6, 'Employee Satisfaction Report', 'Analysis of recent employee satisfaction survey.', '2024-01-06', 4),
(7, 'Social Media Impact Study', 'Impact analysis of social media campaigns.', '2024-01-07', 1),
(8, 'Competitor Benchmarking', 'Comparison of our product against competitors.', '2024-01-08', 3),
(9, 'Supply Chain Efficiency', 'Evaluation of supply chain performance and bottlenecks.', '2024-01-09', 4),
(10, 'Website Traffic Analysis', 'Insight into website traffic and user behavior.', '2024-01-10', 2);

-- RolePermisson table
INSERT INTO RolePermission (role_id, permission_id) VALUES
(2, 1),
(2, 2),
(1, 3),
(2, 3),
(1, 4),
(2, 4),
(1, 5),
(2, 5),
(1, 6),
(2, 6);

-- UserRole table
INSERT INTO `UserRole` (`user_id`, `role_id`) VALUES 
(1, 1), (1, 2),
(2, 2),
(3, 1), (3, 2),
(4, 1),
(5, 2),
(6, 1),
(7, 2),
(8, 1), (8, 2);

-- AnalysisResult table
INSERT INTO AnalysisResult (`id`, `title`, `description`, `body`, `created_at`, `analysisReport_id`, `user_id`) VALUES
(1, 'Q1 Growth Factors', 'Identified factors contributing to growth in Q1.', 'Analysis highlights key growth drivers.', '2024-02-01', 1, 1),
(2, 'Emerging Markets Overview', 'Details on potential emerging markets.', 'Summary of trends in new markets.', '2024-02-02', 2, 2),
(3, 'Top Customer Concerns', 'Key issues raised by customers recently.', 'Detailed analysis of common customer issues.', '2024-02-03', 3, 1),
(4, 'Launch Day Performance', 'Performance metrics on product launch day.', 'In-depth analysis of initial product success.', '2024-02-04', 4, 3),
(5, 'Projected Sales for Q3', 'Sales projection for the next quarter.', 'Data-driven sales projections based on trends.', '2024-02-05', 5, 2),
(6, 'Employee Morale Trends', 'Insights from recent employee feedback.', 'Analysis shows recent morale trends.', '2024-02-06', 6, 4),
(7, 'Social Media Engagement', 'Performance of recent social campaigns.', 'Highlights of user engagement metrics.', '2024-02-07', 7, 1),
(8, 'Competitor Price Comparison', 'Price benchmarking against competitors.', 'Comparative analysis of pricing structures.', '2024-02-08', 8, 3),
(9, 'Logistics Efficiency Review', 'Evaluation of logistics and delivery times.', 'Identified delays in supply chain process.', '2024-02-09', 9, 4),
(10, 'User Journey Insights', 'Behavioral insights on user website journey.', 'Detailed report on user interactions.', '2024-02-10', 10, 2);

-- MediaContentAnalysisResult table
INSERT INTO MediaContentAnalysisResult (mediaContent_id, analysisResult_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 6),
(6, 7),
(7, 8),
(8, 9),
(9, 10),
(10, 1);

-- MediaContentSource table
INSERT INTO MediaContentSource (source_id, mediaContent_id) VALUES
(1, 1), (1, 10),
(2, 2), (2, 9),
(3, 3), (3, 8),
(4, 4), (4, 7),
(5, 5), (5, 6),
(6, 6), (6, 5),
(7, 7), (7, 4),
(8, 8), (8, 3),
(9, 9), (9, 2),
(10, 10), (10, 1);

-- AnalysisResultTag table
INSERT INTO AnalysisResultTag (`analysisResult_id`, `tag_id`) VALUES
(1, 1), 
(1, 11),
(2, 5),
(2, 11), 
(3, 12), 
(4, 13), 
(5, 14), 
(6, 3), 
(6, 15), 
(7, 16), 
(8, 17), 
(9, 18), 
(10, 2), 
(10, 19);

-- AnalysisReportTag table
INSERT INTO AnalysisReportTag (analysisReport_id, tag_id) VALUES 
(1, 2),  
(2, 2),  
(3, 3),  
(4, 2), 
(5, 8),  
(6, 3),  
(7, 2),  
(8, 1), 
(9, 8),  
(10, 2);

-- MediaContentTag table
INSERT INTO MediaContentTag (tag_id, mediaContent_id) VALUES 
(1, 1), 
(1, 2),
(1, 3),
(1, 5),
(1, 7), 
(1, 10),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 7),
(2, 10),
(3, 4),
(3, 10),
(4, 6),
(5, 1),
(5, 7),
(6, 3),
(7, 5),
(8, 7),
(9, 8),
(9,9),
(10, 4),
(10, 10);

-- SourceTag table
INSERT INTO SourceTag (tag_id, source_id) VALUES 
(1, 1), 
(1, 3),
(1, 4),
(1, 10),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 10),
(3, 4),
(3, 10),
(4, 1),
(4, 6),
(5, 1),
(6, 1),
(6, 3),
(7, 2),
(7, 5),
(8, 1),
(9, 8),
(9, 9),
(10, 4),
(10, 10);

COMMIT;


```

---
## RESTfull сервіс для управління даними

### app.js модуль
```js
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import mediaContentRoutes from './routes/mediaContentRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', mediaContentRoutes);

app.use(errorHandler);

export default app;
```

### db.js (підключення до бази даних)
```js
import mysql from 'mysql2'
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).promise()

export default pool;
```

### server.js модуль
```js
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

const start = () => {
    app.listen(port, () => console.log(`Server started on port ${port}`));
};
start();
```

### userRoutes.js (маршрути запитів для користувачів)
```js
import express from 'express';
import {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
} from '../controllers/userController.js';

const userRouter = new express.Router();

userRouter.post('/user', createUser);
userRouter.get('/user', getUsers);
userRouter.get('/user/:id', getUser);
userRouter.patch('/user/:id', updateUser);
userRouter.delete('/user/:id', deleteUser);

export default userRouter;
```

### mediaContentRoutes.js (маршрути запитів для медіа контенту)
```js
import express from 'express';
import {
    createMediaContent,
    getMediaContents,
    getMediaContent,
    updateMediaContent,
    deleteMediaContent,
} from '../controllers/mediaContentController.js';

const mediaContentRouter = new express.Router();

mediaContentRouter.post('/content', createMediaContent);
mediaContentRouter.get('/content', getMediaContents);
mediaContentRouter.get('/content/:id', getMediaContent);
mediaContentRouter.patch('/content/:id', updateMediaContent);
mediaContentRouter.delete('/content/:id', deleteMediaContent);

export default mediaContentRouter;
```

### userController.js (контролер обробки запитів для користувачів)
```js
import {
    createUser,
    getAllUsers,
    findUserById,
    updateUserById,
    deleteUserById,
    findUserByEmail,
} from '../models/userModel.js';
import AppError from '../utils/appError.js';
import handleAsync from '../utils/handleAsync.js';
import { validateRequiredFields } from '../utils/validator.js';

export const createUser = handleAsync(async (req, res) => {
    const userData = req.body;

    validateRequiredFields(userData);

    const user = await findUserByEmail(userData.email);
    if (Object.keys(user).length !== 0) {
        throw new AppError('User has already registered', 400);
    }

    await createUser(userData);
    res
        .status(201)
        .json({ status: 'success', message: 'User registered successfully' });
});

export const getUsers = handleAsync(async (req, res) => {
    const users = await getAllUsers();
    res.status(200).json({ status: 'success', message: users });
});

export const getUser = handleAsync(async (req, res) => {
    const { id } = req.params;
    const user = await findUserById(id);

    if (Object.keys(user).length === 0) {
        throw new AppError('User has not found', 404);
    }

    res.status(200).json({ status: 'success', message: user });
});

export const updateUser = handleAsync(async (req, res) => {
    const { id } = req.params;
    const userData = req.body;

    const user = await findUserById(id);

    if (Object.keys(user).length === 0) {
        throw new AppError('User has not found', 404);
    }

    const updatedUser = await updateUserById(id, userData);

    res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
        updatedUser,
    });
});

export const deleteUser = handleAsync(async (req, res) => {
    const { id } = req.params;

    const user = await findUserById(id);

    if (Object.keys(user).length === 0) {
        throw new AppError('User has not found', 404);
    }

    await deleteUserById(id);

    res.status(200).json({ message: 'User deleted successfully' });
});
```

### mediaContentController.js (контролер обробки запитів для медіа контенту)
```js
import handleAsync from '../utils/handleAsync.js';
import {
    deleteMediaContentById,
    getAllMediaContents,
    getMediaContentById,
    insertMediaContent,
    updateMediaContentById,
} from '../models/mediaContentModel.js';
import { validateRequiredContentFields } from '../utils/validator.js';
import AppError from '../utils/appError.js';

export const createMediaContent = handleAsync(async (req, res) => {
    const mediaContentData = req.body;

    validateRequiredContentFields(mediaContentData);

    await insertMediaContent(mediaContentData);

    res.status(200).json({ status: 'success', message: mediaContentData });
});

export const getMediaContents = handleAsync(async (req, res) => {
    const mediaContents = await getAllMediaContents();
    res.status(200).json({ status: 'success', message: mediaContents });
});

export const getMediaContent = handleAsync(async (req, res) => {
    const { id } = req.params;
    const mediaContent = await getMediaContentById(id);

    if (Object.keys(mediaContent).length === 0) {
        throw new AppError('Media Content has not found', 404);
    }

    res.status(200).json({ status: 'success', message: mediaContent });
});

export const updateMediaContent = handleAsync(async (req, res) => {
    const { id } = req.params;
    const userData = req.body;

    const mediaContent = await getMediaContentById(id);

    if (Object.keys(mediaContent).length === 0) {
        throw new AppError('Media Content has not found', 404);
    }

    const updatedMediaContent = await updateMediaContentById(id, userData);
    res.status(200).json({ status: 'success', message: updatedMediaContent });
});

export const deleteMediaContent = handleAsync(async (req, res) => {
    const { id } = req.params;

    const deletedMediaContent = await deleteMediaContentById(id);

    console.log(deletedMediaContent)

    if (Object.keys(deletedMediaContent).length === 0) {
        throw new AppError('Media Content has not found', 404);
    }

    res
        .status(200)
        .json({ status: 'success', message: 'Media Content Deleted Successfully' });
});
```

### userModel.js (взаємодія з сутністю User)
```js
import db from '../config/db.js';

export const createUser = async (userData) => {
    const { first_name, last_name, email, password } = userData;
    const query = `INSERT INTO User (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;
    return db.query(query, [first_name, last_name, email, password]);
};

export const getAllUsers = async () => {
    const query = `SELECT * FROM User`;
    const result = await db.query(query);
    return result[0];
};

export const findUserById = async (id) => {
    const query = `SELECT * FROM User WHERE id = ${id}`;
    const result = await db.query(query, [id]);
    return result[0];
};

export const updateUserById = async (id, userData) => {
    const fields = Object.keys(userData);
    const values = Object.values(userData);

    const setClause = fields
        .map((field) => `${field} = ?`)
        .join(', ');

    // Обновляем пользователя
    const updateQuery = `
        UPDATE User
        SET ${setClause}
        WHERE id = ?;
    `;
    await db.execute(updateQuery, [...values, id]);

    const selectQuery = `
        SELECT * 
        FROM User
        WHERE id = ?;
    `;
    const [rows] = await db.execute(selectQuery, [id]);

    return rows[0];
};

export const deleteUserById = async (id) => {
    const query = `DELETE FROM User WHERE id = ${id}`;
    await db.query(query, [id]);
};

export const findUserByEmail = async (email) => {
    const query = `SELECT * FROM User WHERE email = '${email}'`;
    const result = await db.query(query, [email]);
    return result[0];
};
```

### mediaContentModel.js (взаємодія з сутністю Media Content)
```js
import db from '../config/db.js';
import AppError from '../utils/appError.js';

export const insertMediaContent = async (contentData) => {
    const { title, description, body, content_type, user_id } = contentData;
    const query = `
    INSERT INTO MediaContent (title, description, body, content_type, user_id)
    VALUES (?, ?, ?, ?, ?);
  `;
    const result = await db.query(query, [title, description, body, content_type, user_id]);
    return result[0];
};

export const getAllMediaContents = async () => {
    const query = `SELECT * FROM MediaContent`;
    const result = await db.query(query);
    return result[0];
};

export const getMediaContentById = async (id) => {
    const query = `SELECT * FROM MediaContent WHERE id = ${id}`;
    const result = await db.query(query, [id]);
    return result[0] || null;
};

export const updateMediaContentById = async (id, contentData) => {
    const fields = Object.keys(contentData);
    const values = Object.values(contentData);

    if (!fields.length) {
        throw new AppError('Nothing to update', 400);
    }

    const setClause = fields
        .map((field) => `${field} = ?`)
        .join(', ');

    const updateQuery = `
        UPDATE MediaContent
        SET ${setClause}
        WHERE id = ?;
    `;
    await db.execute(updateQuery, [...values, id]);

    const selectQuery = `
        SELECT * 
        FROM MediaContent
        WHERE id = ?;
    `;
    const [rows] = await db.execute(selectQuery, [id]);

    return rows[0];
};

export const deleteMediaContentById = async (id) => {
    const query = `DELETE FROM MediaContent WHERE id = ${id}`;
    const result = await db.query(query, [id]);
    return result[0] || null;
};
```

### errorHandler.js (для обробки помилок)
```js
const errorHandler = (err, req, res, next) => {
    console.error(err);

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({ status: err.status, message: err.message });
};

export default errorHandler;
```

### handleAsync.js (обгортка над функціями для перенаправлення помилок)
```js
const handleAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

export default handleAsync;
```

### appError.js (клас помилки)
```js
export default class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        Error.captureStackTrace(this, this.constructor);
    }
}
```

### validator.js (для валідації вхідних даних)
```js
import AppError from './appError.js';

export const validateRequiredFields = (data) => {
    const { first_name, last_name, email, password } = data;
    if (!first_name || !last_name || !email || !password) {
        throw new AppError('Not enough fields for creating User', 400);
    }
};

export const validateRequiredContentFields = (data) => {
    const { title, body, content_type, user_id } = data;

    if (!title || !body || !content_type || !user_id) {
        throw new AppError('Not enough fields for creating Media Content', 400);
    }
};
```
