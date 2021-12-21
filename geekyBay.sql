/*
*********************************************************************
http://www.mysqltutorial.org
*********************************************************************
Name: MySQL Sample Database classicmodels
Link: http://www.mysqltutorial.org/mysql-sample-database.aspx
Version 3.1
+ changed data type from DOUBLE to DECIMAL for amount columns
Version 3.0
+ changed DATETIME to DATE for some colunmns
Version 2.0
+ changed table type from MyISAM to InnoDB
+ added foreign keys for all tables 
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`GeekyBayDB` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `GeekyBayDB`;

/*Table structure for table `customers` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `userID` int(11) NOT NULL auto_increment,
  `userName` varchar(50),
  `password` varchar(255),
  `userLastName` varchar(50) NOT NULL,
  `userFirstName` varchar(50) NOT NULL,
  `emailAddress` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `addressLine1` varchar(50) NOT NULL,
  `addressLine2` varchar(50) DEFAULT NULL,
  `city` varchar(50) NOT NULL,
  `postalCode` varchar(15) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`userID`)
#   KEY `salesRepEmployeeNumber` (`salesRepEmployeeNumber`),
#   CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`salesRepEmployeeNumber`) REFERENCES `employees` (`employeeNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `customers` */

insert  into `users`(`userName`, `password`,  `userLastName`, `userFirstName`,`emailAddress`, `phone`,`addressLine1`,`addressLine2`,`city`,`postalCode`,`country` ,`type` ) values
(null, null, 'Marie', 'Jaques', 'marie.jaques@1st.com', '111111111111', 'Firststreet', '1', 'Firsttown', '1111', 'Belgium', 'buyer'),
('ShadyMike', 'ShadyMike69', 'Shady', 'Mike', 'shady.mike@ripuoff.com', '+11-yeahthiswontring', 'BecodeStreet', '2', 'Antwerp', '2000', 'Belgium', 'seller'),
(null, null, 'Wieo', 'Wieo', 'lokalepolitieantwerpen@popo.com', '100', 'Lawstreet', '3', 'BXL', '1000', 'Belgium', 'buyer'),
('LegitLarry', 'LegitLarry69', 'VeryShady', 'VeryMike', 'larryisreliable@ripuoff.com', '+32 00000000', 'Rue de charlatan', '4', 'Namur', '1654', 'Belgium', 'seller')
;

                                                                                                                                                                                   ;



/*Table structure for table `employees` */

# DROP TABLE IF EXISTS `orderdetails`;
#
# CREATE TABLE `orderdetails` (
#   `orderNumber` int(11) NOT NULL,
#   `productCode` varchar(15) NOT NULL,
#   `quantityOrdered` int(11) NOT NULL,
#   `priceEach` decimal(10,2) NOT NULL,
#   `orderLineNumber` smallint(6) NOT NULL,
#   PRIMARY KEY (`orderNumber`,`productCode`),
#   KEY `productCode` (`productCode`),
#   CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orderNumber`) REFERENCES `orders` (`orderNumber`),
#   CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`productCode`) REFERENCES `products` (`productCode`)
# ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
#
# /*Data for the table `orderdetails` */
#
# insert  into `orderdetails`(`orderNumber`,`productCode`,`quantityOrdered`,`priceEach`,`orderLineNumber`)

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `orderID` int(11) NOT NULL auto_increment,
  `productID` int(11) NOT NULL,
  `orderDate` date NOT NULL,
  `status` varchar(15) NOT NULL,
  `sellerID` int(11) NOT NULL,
  `buyerID` int(11) NOT NULL,
  PRIMARY KEY (`orderID`),
  KEY `sellers` (`sellerID`), KEY `buyers` (`buyerID`), KEY `products` (`productID`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`sellerID`) REFERENCES `users` (`userID`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`buyerID`) REFERENCES `users` (`userID`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `orders` */

insert  into `orders`(`productID`,`orderDate`,`status`,`sellerID`, `buyerID`) values

('1', '11/11/11', 'ordered', '1', '2'),
('2', '21/12/21', 'paid', '2', '3'),
('3', '31/03/13', 'shipped', '3', '4'),
('4', '14/04/14', 'lost', '4', '5')
;
/*Table structure for table `productlines` */
#
# DROP TABLE IF EXISTS `productlines`;
#
# CREATE TABLE `productlines` (
#   `productLine` varchar(50) NOT NULL,
#   `textDescription` varchar(4000) DEFAULT NULL,
#   `htmlDescription` mediumtext,
#   `image` mediumblob,
#   PRIMARY KEY (`productLine`)
# ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `productlines` */

# insert  into `productlines`(`productLine`,`textDescription`,`htmlDescription`,`image`) values
#
# ('Classic Cars','Attention car enthusiasts: Make your wildest car ownership dreams come true. Whether you are looking for classic muscle cars, dream sports cars or movie-inspired miniatures, you will find great choices in this category. These replicas feature superb attention to detail and craftsmanship and offer features such as working steering system, opening forward compartment, opening rear trunk with removable spare wheel, 4-wheel independent spring suspension, and so on. The models range in size from 1:10 to 1:24 scale and include numerous limited edition and several out-of-production vehicles. All models include a certificate of authenticity from their manufacturers and come fully assembled and ready for display in the home or office.',NULL,NULL),
#
# ('Motorcycles','Our motorcycles are state of the art replicas of classic as well as contemporary motorcycle legends such as Harley Davidson, Ducati and Vespa. Models contain stunning details such as official logos, rotating wheels, working kickstand, front suspension, gear-shift lever, footbrake lever, and drive chain. Materials used include diecast and plastic. The models range in size from 1:10 to 1:50 scale and include numerous limited edition and several out-of-production vehicles. All models come fully assembled and ready for display in the home or office. Most include a certificate of authenticity.',NULL,NULL),
#
# ('Planes','Unique, diecast airplane and helicopter replicas suitable for collections, as well as home, office or classroom decorations. Models contain stunning details such as official logos and insignias, rotating jet engines and propellers, retractable wheels, and so on. Most come fully assembled and with a certificate of authenticity from their manufacturers.',NULL,NULL),
#
# ('Ships','The perfect holiday or anniversary gift for executives, clients, friends, and family. These handcrafted model ships are unique, stunning works of art that will be treasured for generations! They come fully assembled and ready for display in the home or office. We guarantee the highest quality, and best value.',NULL,NULL),
#
# ('Trains','Model trains are a rewarding hobby for enthusiasts of all ages. Whether you\'re looking for collectible wooden trains, electric streetcars or locomotives, you\'ll find a number of great choices for any budget within this category. The interactive aspect of trains makes toy trains perfect for young children. The wooden train sets are ideal for children under the age of 5.',NULL,NULL),
#
# ('Trucks and Buses','The Truck and Bus models are realistic replicas of buses and specialized trucks produced from the early 1920s to present. The models range in size from 1:12 to 1:50 scale and include numerous limited edition and several out-of-production vehicles. Materials used include tin, diecast and plastic. All models include a certificate of authenticity from their manufacturers and are a perfect ornament for the home and office.',NULL,NULL),
#
# ('Vintage Cars','Our Vintage Car models realistically portray automobiles produced from the early 1900s through the 1940s. Materials used include Bakelite, diecast, plastic and wood. Most of the replicas are in the 1:18 and 1:24 scale sizes, which provide the optimum in detail and accuracy. Prices range from $30.00 up to $180.00 for some special limited edition replicas. All models include a certificate of authenticity from their manufacturers and come fully assembled and ready for display in the home or office.',NULL,NULL);
#
# /*Table structure for table `products` */

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `productID` INT NOT NULL auto_increment,
  `productName` varchar(70) NOT NULL,
-- #   `productLine` varchar(50) NOT NULL,
  `sellerID` INT NOT NULL,
  `productDescription` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`productID`),
  KEY `products` (`sellerID`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`sellerID`) REFERENCES `users` (`userID`)
-- #   KEY `productLine` (`productLine`),
-- #   CONSTRAINT `products_ibfk_1` FOREIGN KEY (`productLine`) REFERENCES `productlines` (`productLine`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `products` */

insert  into `products`(`productName`, `sellerID`, `productDescription`, `price`) values

( 'guitar1', '1', 'stringy1', '1000'),
( 'guitar2', '2', 'stringy2', '2000'),
( 'guitar3', '3', 'stringy3', '3000'),
( 'guitar4', '4', 'stringy3', '4000')
;



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
