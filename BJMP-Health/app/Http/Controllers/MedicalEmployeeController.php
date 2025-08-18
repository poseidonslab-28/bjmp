<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Inertia\Inertia;

class MedicalEmployeeController extends Controller
{
    public function index()
    {
        // Fetch only employees where isMedEmp = true (or 1)
        $employees = Employee::where('isMedEmp', 1)->get();

        // Pass data to Inertia
        return Inertia::render('employee-account', [
            'employees' => $employees,
        ]);
    }
}
