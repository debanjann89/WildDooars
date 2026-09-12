<?php
// Hostinger MySQL Database Configuration
// Edit the 4 values below with your Hostinger database details:

class Database {
    // 1. Hostinger MySQL Host (Almost always 'localhost')
    private $host = "localhost";

    // 2. Your Hostinger Database Name (e.g. u123456789_wilddooars)
    private $db_name = "wild_dooars";

    // 3. Your Hostinger Database Username (e.g. u123456789_admin)
    private $username = "root";

    // 4. Your Hostinger Database Password
    private $password = "";

    public $conn;
    public $last_error = null;

    public function getConnection() {
        $this->conn = null;
        $this->last_error = null;

        // Support environment variables if set in Hostinger
        $host = getenv('DB_HOST') ?: $this->host;
        $db_name = getenv('DB_NAME') ?: $this->db_name;
        $username = getenv('DB_USER') ?: $this->username;
        $password = getenv('DB_PASS') !== false ? getenv('DB_PASS') : $this->password;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $host . ";dbname=" . $db_name . ";charset=utf8mb4",
                $username,
                $password,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]
            );
        } catch(PDOException $exception) {
            $this->last_error = $exception->getMessage();
            // In production API, gracefully return null so frontend fallbacks work
        }
        return $this->conn;
    }
}
?>
