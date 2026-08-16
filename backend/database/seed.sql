-- Seed Data for Wild Dooars Tours & Travels Database

USE wild_dooars;

-- Default Admin User (admin@wilddooars.com / WildDooars@2026)
INSERT INTO admins (username, email, password_hash, role) VALUES
('admin', 'admin@wilddooars.com', '$2y$10$w3p1Q9E1K6Z5Y2X4W8V0U.123456789012345678901234567890', 'admin')
ON DUPLICATE KEY UPDATE username=username;

-- Default Business Settings
INSERT INTO settings (setting_key, setting_value) VALUES
('businessName', 'Wild Dooars Tours & Travels'),
('bengaliName', 'ওয়াইল্ড ডুয়ার্স ট্যুরস & ট্রাভেলস'),
('phone', '081164 42729'),
('whatsapp', '918116442729'),
('email', 'info@wilddooarstours.com'),
('address', 'Near Jaldapara National Park, Badaitari, Khauchandpara, West Bengal 735220'),
('plusCode', 'J7F5+25 Badaitari, West Bengal'),
('googleRating', '4.8 ★'),
('reviewsCount', '97 reviews'),
('heroHeadline', 'Explore the Wild Heart of Dooars'),
('heroSubheadline', 'Wildlife, forests, rivers and unforgettable journeys — planned around your travel experience.'),
('heroImage', 'https://images.unsplash.com/photo-1547970810-dc0eac25ee85?auto=format&fit=crop&w=1920&q=80')
ON DUPLICATE KEY UPDATE setting_key=setting_key;
