<?php 
use App\Http\Controllers\EmployeeProfileController;

Route::get('/employees', [EmployeeProfileController::class, 'index']);
?>