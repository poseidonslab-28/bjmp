<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Auth\EmployeeAuthController;
use App\Http\Controllers\MedicalHistoryController;

// Employee Authentication Routes
Route::get('/login', [EmployeeAuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [EmployeeAuthController::class, 'login'])->name('login.post');
Route::post('/logout', [EmployeeAuthController::class, 'logout'])
    ->middleware('auth:employee')
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class])
    ->name('logout');
Route::get('/user', [EmployeeAuthController::class, 'user'])->middleware('auth:employee');

Route::get('/test-db', function () {
    try {
        $employee = \App\Models\Employee::where('Emp_ID', 'P120141')->first();
        if ($employee) {
            return response()->json([
                'status' => 'success',
                'message' => 'Employee found',
                'employee_data' => [
                    'Emp_ID' => $employee->Emp_ID,
                    'First_Name' => $employee->First_Name ?? 'NULL',
                    'Last_Name' => $employee->Last_Name ?? 'NULL',
                    'isAdmin' => $employee->isAdmin ?? 'NULL',
                    'isMedEmp' => $employee->isMedEmp ?? 'NULL',
                    'isActive' => $employee->isActive ?? 'NULL',
                    'all_attributes' => array_keys($employee->getAttributes())
                ]
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Employee P120141 not found'
            ]);
        }
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Database error: ' . $e->getMessage()
        ]);
    }
});

// Redirect root to employee login if not authenticated
Route::get('/', function () {
    if (auth('employee')->check()) {
        $employee = auth('employee')->user();
        if ($employee->isAdmin == 1) {
            return redirect()->route('dashboard');
        } elseif ($employee->isMedEmp == 1) {
            return redirect('/medical/dashboard');
        } else {
            return redirect()->route('employee.dashboard');
        }
    }
    return redirect()->route('login');
})->name('home');

// Legacy routes (keeping existing functionality)
Route::middleware(['auth:employee'])->group(function () {
    Route::get('dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');
    Route::get('/admin/dashboard', fn() => Inertia::render('dashboard'))->name('admin.dashboard');
    Route::get('personal-information', function () {
        return Inertia::render('personal-information');
    })->name('personal-information');
    Route::get('employee-account', fn() => Inertia::render('employee-account'))->name('employee-account');
    Route::get('employee-account/personal-profile', function () {
        return Inertia::render('employee-account/personal-profile');
    })->name('employee-account.personal-profile');
    Route::get('medical-personnel', fn() => Inertia::render('medical-personnel'))->name('medical-personnel');
    Route::get('help', function () {
        return Inertia::render('help', [
            'helpData' => \App\Models\Help::all()
        ]);
    })->name('help');
    Route::get('about-us', function () {
        return Inertia::render('about-us', [
            'aboutUsData' => \App\Models\AboutUs::all()
        ]);
    })->name('about-us');
    Route::get('security', fn() => Inertia::render('security'))->name('security');
    Route::get('activity-log', fn() => Inertia::render('activity-log'))->name('activity-log');


    // Medical Personnel specific routes (role-protected)
    Route::middleware(['auth:employee', 'role:medical'])->group(function () {
        Route::get('/medical/dashboard', function () {
            return Inertia::render('medical-personnel/med-dashboard', [
                'employee' => auth('employee')->user()
            ]);
        });
        Route::get('/medical/about-us', function () {
            return Inertia::render('medical-personnel/about-us');
        });

        // Medical History routes
        Route::get('/medical/employee-account/medical-history', [MedicalHistoryController::class, 'index'])
            ->name('medical.employee.medical-history');
        Route::get('/medical/employee-account/personal-profile/{empId}', [MedicalHistoryController::class, 'profile'])
            ->name('medical.employee.profile.show');
        Route::get('/medical/employee-account/medical-history/{empId}', [MedicalHistoryController::class, 'show'])
            ->name('medical.employee.medical-history.show');

        Route::get('/medical-personnel/about-us', function () {
            return Inertia::render('medical-personnel/about-us', [
                'user' => auth('medical')->user(),
                'aboutUsData' => \App\Models\AboutUs::all()
            ]);
        });

        Route::get('/medical/personal-information', function () {
            $employee = auth('employee')->user();
            return Inertia::render('medical-personnel/med-personal-information', [
                'employee' => $employee
            ]);
        });

        Route::put('/medical/personal-information', function (Request $request) {
            $employee = auth('employee')->user();

            $validatedData = $request->validate([
                'First_Name' => 'required|string|max:255',
                'Middle_Name' => 'nullable|string|max:255',
                'Last_Name' => 'required|string|max:255',
                'Suffix' => 'nullable|string|max:10',
                'Age' => 'nullable|integer|min:1|max:120',
                'Birth_Date' => 'nullable|date',
                'Birth_Place' => 'nullable|string|max:255',
                'Religion' => 'nullable|string|max:255',
                'Civil_Status' => 'nullable|string|max:50',
                'Contact_No' => 'nullable|string|max:20',
                'Email' => 'nullable|email|max:255',
                'House_No' => 'nullable|string|max:50',
                'Street_Address' => 'nullable|string|max:255',
                'Baranggay' => 'nullable|string|max:255',
                'City' => 'nullable|string|max:255',
                'Province' => 'nullable|string|max:255',
                'Zip_Code' => 'nullable|string|max:10',
                'Position' => 'nullable|string|max:255',
                'Office_Jail' => 'nullable|string|max:255',
                'Height' => 'nullable|numeric|min:0',
                'Weight' => 'nullable|numeric|min:0',
                'BMI' => 'nullable|numeric|min:0',
                'BMI_Class' => 'nullable|string|max:50',
                'Phy_classification' => 'nullable|string|max:100',
                'Ph_health' => 'nullable|string|max:255',
                'Contact_Person' => 'nullable|string|max:255',
                'C_P_Relationship' => 'nullable|string|max:100',
                'C_P_Address' => 'nullable|string|max:500',
                'C_P_Contact' => 'nullable|string|max:20',
            ]);

            $employeeModel = \App\Models\Employee::where('Emp_ID', $employee->Emp_ID)->first();

            if (!$employeeModel) {
                return redirect()->back()->with('error', 'Employee record not found.');
            }

            $employeeModel->update($validatedData);

            return redirect()->back()->with('success', 'Personal information updated successfully.');
        });
        Route::get('/medical/employee-account', function () {
            // Fetch all active employees
            $employees = \App\Models\Employee::where('isActive', 1)
                ->orderBy('Last_Name')
                ->orderBy('First_Name')
                ->get();

            return Inertia::render('medical-personnel/med-employee-account', [
                'employees' => $employees
            ]);
        });
        Route::get('/medical/help', function () {
            return Inertia::render('medical-personnel/med-help');
        });
        Route::get('/medical/about-us', function () {
            return Inertia::render('medical-personnel/med-about-us', [
                'aboutUsData' => \App\Models\AboutUs::all()
            ]);
        });
        Route::get('/medical/employee-account/personal-profile/{emp_id}', [\App\Http\Controllers\MedicalEmployeeController::class, 'showProfile']);
        Route::get('/medical/employee-account/medical-history/{emp_id}', function ($emp_id) {
            $employee = \App\Models\Employee::where('Emp_ID', $emp_id)->first();
            if (!$employee) {
                abort(404, 'Employee not found');
            }

            $medicalHistory = \App\Models\MedHistory::where('Patient_ID', $emp_id)->first();

            return Inertia::render('medical-personnel/employee-account/medical-history', [
                'employee' => $employee,
                'medicalHistory' => $medicalHistory
            ]);
        });
        Route::get('/medical/employee-account/laboratory/{emp_id}', function ($emp_id) {
            $employee = \App\Models\Employee::where('Emp_ID', $emp_id)->first();
            if (!$employee) {
                abort(404, 'Employee not found');
            }

            // Get laboratory records where Lab_Taker_ID matches the employee ID
            $laboratories = \App\Models\Laboratory::where('Lab_Taker_ID', $emp_id)
                ->where('archived', false)
                ->orderBy('Lab_Date', 'desc')
                ->get();

            return Inertia::render('medical-personnel/employee-account/laboratory', [
                'employee' => $employee,
                'laboratories' => $laboratories
            ]);
        });
        Route::get('/medical/employee-account/laboratory/{emp_id}/details/{lab_id}', function ($emp_id, $lab_id) {
            $employee = \App\Models\Employee::where('Emp_ID', $emp_id)->first();
            $laboratory = \App\Models\Laboratory::where('ID', $lab_id)->first();

            if (!$employee || !$laboratory) {
                abort(404, 'Employee or Laboratory record not found');
            }

            // Get related lab results
            $labBloodCount = \App\Models\LabBloodCount::where('Lab_ID', $lab_id)->first();
            $labBloodChem = \App\Models\LabBloodChem::where('LAB_ID', $lab_id)->first();
            $labClinicMic = \App\Models\LabClinicMic::where('LAB_ID', $lab_id)->first();

            return Inertia::render('medical-personnel/employee-account/laboratory-details', [
                'employee' => $employee,
                'laboratory' => $laboratory,
                'labBloodCount' => $labBloodCount,
                'labBloodChem' => $labBloodChem,
                'labClinicMic' => $labClinicMic
            ]);
        });
        Route::get('/medical/employee-account/imaging/{emp_id}', function ($emp_id) {
            $employee = \App\Models\Employee::where('Emp_ID', $emp_id)->first();
            if (!$employee) {
                abort(404, 'Employee not found');
            }

            // Get imaging records for the employee
            $imagingRecords = \App\Models\Imaging::where('Emp_ID', $emp_id)
                ->where('archived', false)
                ->orderBy('Date', 'desc')
                ->get();

            return Inertia::render('medical-personnel/employee-account/imaging', [
                'employee' => $employee,
                'imagingRecords' => $imagingRecords
            ]);
        });
        Route::get('/medical/employee-account/vaccination/{emp_id}', function ($emp_id) {
            $employee = \App\Models\Employee::where('Emp_ID', $emp_id)->first();
            if (!$employee) {
                abort(404, 'Employee not found');
            }

            // Get vaccination records for the employee (using Patient_ID which is the employee's ID)
            $vaccinations = \App\Models\Vaccination::where('Patient_ID', $emp_id)
                ->where('archived', false)
                ->orderBy('Date', 'desc')
                ->get();

            return Inertia::render('medical-personnel/employee-account/vaccination', [
                'employee' => $employee,
                'vaccinations' => $vaccinations
            ]);
        });
        Route::get('/medical/employee-account/dental-record/{emp_id}', function ($emp_id) {
            $employee = \App\Models\Employee::where('Emp_ID', $emp_id)->first();
            if (!$employee) {
                abort(404, 'Employee not found');
            }

            return Inertia::render('medical-personnel/employee-account/dental-record', [
                'employee' => $employee
            ]);
        });
        Route::get('/medical/employee-account/doctors-note/{emp_id}', function ($emp_id) {
            $employee = \App\Models\Employee::where('Emp_ID', $emp_id)->first();
            if (!$employee) {
                abort(404, 'Employee not found');
            }

            return Inertia::render('medical-personnel/employee-account/doctors-note', [
                'employee' => $employee
            ]);
        });
    });
    Route::get('employee-account/medical-history', function () {
        return Inertia::render('employee-account/medical-history');
    })->name('employee-account.medical-history');
    Route::get('employee-account/laboratory', function () {
        return Inertia::render('employee-account/laboratory');
    })->name('employee-account.laboratory');
    Route::get('employee-account/imaging', function () {
        return Inertia::render('employee-account/imaging');
    })->name('employee-account.imaging');
    Route::get('employee-account/vaccination', function () {
        return Inertia::render('employee-account/vaccination');
    })->name('employee-account.vaccination');
    Route::get('employee-account/dental-record', function () {
        return Inertia::render('employee-account/dental-record');
    })->name('employee-account.dental-record');
    Route::get('employee-account/doctors-note', function () {
        return Inertia::render('employee-account/doctors-note');
    })->name('employee-account.doctors-note');
    Route::get('employee-account/security', function () {
        return Inertia::render('employee-account/security');
    })->name('employee-account.security');
    Route::get('employee-account/activity-log', function () {
        return Inertia::render('employee-account/activity-log');
    })->name('employee-account.activity-log');
    Route::get('medical_personnel/personal-profile', function () {
        return Inertia::render('medical_personnel/personal-profile');
    })->name('medical_personnel.personal-profile');
    Route::get('medical_personnel/medical-history', function () {
        return Inertia::render('medical_personnel/medical-history');
    })->name('medical_personnel.medical-history');
    Route::get('medical_personnel/laboratory', function () {
        return Inertia::render('medical_personnel/laboratory');
    })->name('medical_personnel.laboratory');
    Route::get('medical_personnel/imaging', function () {
        return Inertia::render('medical_personnel/imaging');
    })->name('medical_personnel.imaging');
    Route::get('medical_personnel/vaccination', function () {
        return Inertia::render('medical_personnel/vaccination');
    })->name('medical_personnel.vaccination');
    Route::get('medical_personnel/dental-record', function () {
        return Inertia::render('medical_personnel/dental-record');
    })->name('medical_personnel.dental-record');
    Route::get('medical_personnel/doctors-note', function () {
        return Inertia::render('medical_personnel/doctors-note');
    })->name('medical_personnel.doctors-note');
    Route::get('medical_personnel/security', function () {
        return Inertia::render('medical_personnel/security');
    })->name('medical_personnel.security');
    Route::get('medical_personnel/activity-log', function () {
        return Inertia::render('medical_personnel/activity-log');
    })->name('medical_personnel.activity-log');


    // Employee specific routes  
    Route::get('/employee/dashboard', function () {
        return Inertia::render('employee/emp-dashboard', [
            'user' => auth('employee')->user()
        ]);
    })->name('employee.dashboard');
    Route::get('/employee/dental-record', function () {
        $user = auth('employee')->user();

        // If no user is logged in, use a sample user for testing
        if (!$user) {
            $user = \App\Models\Employee::where('Emp_ID', 'P212101')->first();
        }

        $dentalRecord = \App\Models\DentalRecord::where('Patient_ID', $user->Emp_ID)->first();

        return Inertia::render('employee/dental-record', [
            'user' => $user,
            'dentalRecord' => $dentalRecord
        ]);
    });
    Route::get('/employee/doctors-note', function () {
        return Inertia::render('employee/doctor\'s-note', [
            'user' => auth('employee')->user()
        ]);
    });
    Route::get('/employee/imaging', function () {
        return Inertia::render('employee/imaging', [
            'user' => auth('employee')->user()
        ]);
    });
    Route::get('/employee/laboratory', function () {
        $user = auth('employee')->user();

        // Get laboratory records for the user (using Lab_Taker_ID since that's the employee's ID)
        $laboratories = \App\Models\Laboratory::where('Lab_Taker_ID', $user->Emp_ID)
            ->where('archived', false)
            ->orderBy('Lab_Date', 'desc')
            ->get();

        return Inertia::render('employee/laboratory', [
            'user' => $user,
            'laboratories' => $laboratories
        ]);
    });
    Route::get('/employee/laboratory-details/{id}', function ($id) {
        $user = auth('employee')->user();

        // Get laboratory record with relationships (using Lab_Taker_ID to verify ownership)
        $laboratory = \App\Models\Laboratory::with(['bloodChem', 'bloodCount', 'clinicMic'])
            ->where('ID', $id)
            ->where('Lab_Taker_ID', $user->Emp_ID)  // Changed from Emp_ID to Lab_Taker_ID
            ->first();

        if (!$laboratory) {
            return redirect('/employee/laboratory')->with('error', 'Laboratory record not found.');
        }

        return Inertia::render('employee/laboratory-details', [
            'user' => $user,
            'laboratory' => $laboratory,
            'labBloodCount' => $laboratory->bloodCount,
            'labBloodChem' => $laboratory->bloodChem,
            'labClinicMic' => $laboratory->clinicMic
        ]);
    });
    Route::get('/employee/medical-history', function () {
        $user = auth('employee')->user();
        $medHistory = null;

        if ($user) {
            $medHistory = \App\Models\MedHistory::where('Patient_ID', $user->Emp_ID)->first();
        }

        return Inertia::render('employee/medical-history', [
            'user' => $user,
            'medHistory' => $medHistory
        ]);
    });
    Route::post('/employee/medical-history/save', function () {
        $user = auth('employee')->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $validated = request()->validate([
            'Present_HC' => 'nullable|string|max:500',
            'Past_HC' => 'nullable|string|max:500',
            'Allergies' => 'nullable|string|max:500',
            'Family_HH' => 'nullable|string|max:1000',
            'Current_M' => 'nullable|string|max:500',
            'Other' => 'nullable|string|max:500',
            'Pediatric_H' => 'nullable|string|max:500',
            'Major_AI' => 'nullable|string|max:500',
            'Surgery' => 'nullable|string|max:500',
            'Serious_PI' => 'nullable|string|max:500',
            'Limitation' => 'nullable|string|max:500',
            'Med_H' => 'nullable|string|max:500',
            'Transfusion_H' => 'nullable|string|max:500',
            'Mental_P' => 'nullable|string|max:500',
            'Smoker_Freq' => 'nullable|string|max:255',
            'Alcohol_Freq' => 'nullable|string|max:255',
            'G' => 'nullable|string|max:255',
            'P' => 'nullable|string|max:255',
            'LMP' => 'nullable|string|max:255',
            'blood' => 'nullable|string|max:255',
            'physical' => 'nullable|string|max:255',
        ]);

        // Convert empty strings to null for database fields that don't allow empty strings
        $dataToSave = [];
        foreach ($validated as $key => $value) {
            $dataToSave[$key] = ($value === null) ? '' : $value;
        }

        try {
            // Check if medical history record exists
            $medHistory = \App\Models\MedHistory::where('Patient_ID', $user->Emp_ID)->first();

            if ($medHistory) {
                // Update existing record
                $medHistory->update($dataToSave);
            } else {
                // Create new record
                $dataToSave['Patient_ID'] = $user->Emp_ID;
                $dataToSave['Record_ID'] = 'MH' . $user->Emp_ID . date('YmdHis'); // Generate a unique Record_ID
                $medHistory = \App\Models\MedHistory::create($dataToSave);
            }

            // Redirect back to the medical history page to refresh the data
            return redirect('/employee/medical-history')->with('success', 'Medical history saved successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to save medical history: ' . $e->getMessage());
        }
    })->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
    Route::get('/employee/personal-information', function () {
        return Inertia::render('employee/personal-information', [
            'user' => auth('employee')->user()
        ]);
    });
    Route::put('/employee/personal-information', function () {
        $employee = auth('employee')->user();

        if (!$employee) {
            return redirect()->route('login')->with('error', 'Please log in to continue.');
        }

        $validated = request()->validate([
            'First_Name' => 'required|string|max:255',
            'Last_Name' => 'required|string|max:255',
            'Middle_Name' => 'nullable|string|max:255',
            'Email' => 'required|email|max:255',
            'Contact_No' => 'nullable|string|max:255',
            'Religion' => 'nullable|string|max:255',
            'Civil_Status' => 'nullable|string|max:255',
            'isFemale' => 'nullable|integer|in:0,1',
            'Birth_Place' => 'nullable|string|max:255',
            'Birth_Date' => 'nullable|date',
            'Age' => 'nullable|integer',
            'Street_Address' => 'nullable|string|max:255',
            'House_No' => 'nullable|string|max:255',
            'Province' => 'nullable|string|max:255',
            'City' => 'nullable|string|max:255',
            'Baranggay' => 'nullable|string|max:255',
            'Position' => 'nullable|string|max:255',
            'Position_Code' => 'nullable|string|max:255',
            'Office_Jail' => 'nullable|string|max:255',
            'Height' => 'nullable|numeric',
            'Weight' => 'nullable|numeric',
            'BMI_Class' => 'nullable|string|max:255',
            'Phy_classification' => 'nullable|string|max:255',
            'Ph_health' => 'nullable|string|max:255',
            'Allergies' => 'nullable|string|max:255',
            'Blood_Type' => 'nullable|string|max:255',
            'Contact_Person' => 'nullable|string|max:255',
            'C_P_Relationship' => 'nullable|string|max:255',
            'C_P_Address' => 'nullable|string|max:500',
            'C_P_Contact' => 'nullable|string|max:255',
        ]);

        // Get the Employee model instance properly
        $employeeModel = \App\Models\Employee::where('Emp_ID', $employee->Emp_ID)->first();

        if (!$employeeModel) {
            return redirect()->back()->with('error', 'Employee record not found.');
        }

        $employeeModel->update($validated);

        return redirect()->back()->with('success', 'Personal information updated successfully');
    })->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class])->name('employee.personal-information.update');
    Route::get('/employee/vaccination', function () {
        return Inertia::render('employee/vaccination', [
            'user' => auth('employee')->user()
        ]);
    });
    Route::get('/employee/about-us', function () {
        return Inertia::render('employee/about-us', [
            'user' => auth('employee')->user(),
            'aboutUsData' => \App\Models\AboutUs::all()
        ]);
    });
    Route::get('/employee/help', function () {
        return Inertia::render('employee/help', [
            'user' => auth('employee')->user(),
            'helpData' => \App\Models\Help::all()
        ]);
    });

    // Debug route to test CSRF
    Route::post('/test-csrf', function () {
        return response()->json([
            'status' => 'success',
            'message' => 'CSRF token is working properly'
        ]);
    });
});

use App\Http\Controllers\EmployeeProfileController;
use App\Http\Controllers\MedicalEmployeeController;

Route::post('/employees/store', [EmployeeProfileController::class, 'store'])->name('employee.store')->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
Route::get('/dashboard', action: [EmployeeProfileController::class, 'dashboard'])->name('employee.dashboard');
Route::get('/employee-account', action: [EmployeeProfileController::class, 'index'])->name('employee.index');
Route::get('/medical-personnel', action: [MedicalEmployeeController::class, 'index'])->name('employee.index');
Route::get('/employee-account/personal-profile/{empId}', [EmployeeProfileController::class, 'show'])->name('employee.personal-profile');
Route::put('/employee-account/personal-profile/{id}', action: [EmployeeProfileController::class, 'update'])->name('employee.update');
Route::get('/employee-account/medical-history/{empId}', [EmployeeProfileController::class, 'show'])->name('employee.personal-profile');
Route::post('/employee-account/{id}/toggle-active', [EmployeeProfileController::class, 'toggleActive'])->name('employee.toggleActive');
Route::get('/personal-information/{empId}', [EmployeeProfileController::class, 'show'])
    ->name('employee.personal-information');


use App\Http\Controllers\AboutUsController;

Route::get('/about-us', [AboutUsController::class, 'index'])->name('about.index');
Route::post('/about-us/insert', [AboutUsController::class, 'store']);

Route::get('/security', [EmployeeProfileController::class, 'security'])->name('security');
Route::post('/security/update-email', [EmployeeProfileController::class, 'updateEmail'])->name('security.updateEmail');
Route::post('/security/update-mobile', [EmployeeProfileController::class, 'updateMobile'])->name('security.updateMobile');
Route::post('/security/update-password', [EmployeeProfileController::class, 'updatePassword'])->name('security.updatePassword');




require __DIR__ . '/settings.php';
// require __DIR__.'/auth.php'; // Commented out - using custom employee authentication instead
