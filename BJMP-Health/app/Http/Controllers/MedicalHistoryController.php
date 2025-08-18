<?php

namespace App\Http\Controllers;

use App\Models\MedHistory;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MedicalHistoryController extends Controller
{
    public function index()
    {
        $currentUser = auth('employee')->user();
        return Inertia::render('medical-personnel/employee-account/medical-history', [
            'employee' => $currentUser,
            'medicalHistory' => MedHistory::where('Patient_ID', $currentUser->Emp_ID)
                ->latest('ID')
                ->first()
        ]);
    }

    public function show($empId)
    {
        $employee = Employee::findOrFail($empId);
        $medHistory = MedHistory::where('Patient_ID', $empId)
            ->latest('ID')
            ->first();

        return Inertia::render('medical-personnel/employee-account/medical-history', [
            'employee' => $employee,
            'medicalHistory' => $medHistory
        ]);
    }

    // New method for personal profile page
    public function profile($empId)
    {
        $employee = Employee::findOrFail($empId);
        return Inertia::render('medical-personnel/employee-account/personal-profile', [
            'employee' => $employee
        ]);
    }
}
