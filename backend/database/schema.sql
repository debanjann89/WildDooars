-- MySQL Database Schema for Wild Dooars Tours & Travels
-- Absolute Pricing Rule Enforced: No price columns anywhere in schema.

CREATE DATABASE IF NOT EXISTS wild_dooars DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE wild_dooars;

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Business Settings Table
CREATE TABLE IF NOT EXISTS settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Tour Packages Table (NO PRICE FIELD)
CREATE TABLE IF NOT EXISTS packages (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  destination VARCHAR(255) NOT NULL,
  category ENUM('Family', 'Honeymoon', 'Adventure', 'Wildlife', 'Package Tours', 'Customized') NOT NULL DEFAULT 'Package Tours',
  duration VARCHAR(100) NOT NULL,
  short_description TEXT,
  full_description LONGTEXT,
  main_image VARCHAR(500),
  gallery_json JSON,
  highlights_json JSON,
  inclusions_json JSON,
  exclusions_json JSON,
  itinerary_json JSON,
  important_notes_json JSON,
  faqs_json JSON,
  is_featured TINYINT(1) DEFAULT 1,
  is_published TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Destinations Table
CREATE TABLE IF NOT EXISTS destinations (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  intro VARCHAR(500),
  description LONGTEXT,
  main_image VARCHAR(500),
  gallery_json JSON,
  attractions_json JSON,
  activities_json JSON,
  is_featured TINYINT(1) DEFAULT 1,
  is_published TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Safaris Table
CREATE TABLE IF NOT EXISTS safaris (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  safari_type ENUM('Jeep Safari', 'Elephant Safari', 'Wildlife Trail') NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(500),
  availability_note TEXT,
  is_published TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Vehicles Table (NO PRICE FIELD)
CREATE TABLE IF NOT EXISTS vehicles (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  seating_capacity VARCHAR(100) NOT NULL,
  fuel_type VARCHAR(50) DEFAULT 'Diesel',
  ac_type ENUM('AC', 'Non-AC', 'Both Available') DEFAULT 'AC',
  features_json JSON,
  image VARCHAR(500),
  is_published TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Hotels & Resorts Table (NO PRICE FIELD)
CREATE TABLE IF NOT EXISTS hotels (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  property_type ENUM('Hotel', 'Resort', 'Homestay') DEFAULT 'Resort',
  location VARCHAR(255) NOT NULL,
  description TEXT,
  amenities_json JSON,
  image VARCHAR(500),
  gallery_json JSON,
  is_published TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Customer Enquiries Inbox Table
CREATE TABLE IF NOT EXISTS enquiries (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(150),
  travel_date VARCHAR(50),
  travellers_count VARCHAR(50),
  destination VARCHAR(255),
  trip_type VARCHAR(100),
  vehicle_preference VARCHAR(150),
  hotel_preference VARCHAR(150),
  message TEXT,
  status ENUM('New', 'Contacted', 'Follow-up', 'Confirmed', 'Closed') DEFAULT 'New',
  internal_notes_json JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. Media Assets Table
CREATE TABLE IF NOT EXISTS media (
  id VARCHAR(100) PRIMARY KEY,
  file_name VARCHAR(255) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_type VARCHAR(50),
  file_size INT,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
