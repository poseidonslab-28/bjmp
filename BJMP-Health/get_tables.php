<?php
try {
    $pdo = new PDO('mysql:host=127.0.0.1;dbname=bjmphrmsdb;charset=utf8mb4', 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
    
    $tables = $pdo->query('SHOW TABLES')->fetchAll(PDO::FETCH_COLUMN);
    
    echo "=== DATABASE TABLES ===\n";
    foreach($tables as $table) {
        echo $table . "\n";
    }
    
    echo "\n=== TABLE STRUCTURES ===\n";
    foreach($tables as $table) {
        if ($table === 'tbl_employee') continue; // Skip employee table as requested
        
        echo "\n--- Table: $table ---\n";
        $columns = $pdo->query("DESCRIBE $table")->fetchAll(PDO::FETCH_ASSOC);
        foreach($columns as $column) {
            echo sprintf("%-25s %-20s %s\n", 
                $column['Field'], 
                $column['Type'], 
                $column['Key'] ? "({$column['Key']})" : ''
            );
        }
    }
    
} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage() . "\n";
}
?>
