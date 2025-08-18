<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class EmployeeAuthController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('auth/login');
    }
    
    public function login(Request $request)
    {
        Log::info('Login attempt started for: ' . $request->emp_id);
        
        $request->validate([
            'emp_id' => 'required|string|max:255',
            'password' => 'required|string',
        ], [
            'emp_id.required' => 'Employee ID is required.',
            'emp_id.string' => 'Employee ID must be a valid string.',
            'password.required' => 'Password is required.',
        ]);
        
        Log::info('Validation passed, searching for employee with ID: ' . $request->emp_id);
        
        $employee = Employee::where('Emp_ID', $request->emp_id)
                           ->where('isActive', 1)
                           ->first();
        
        Log::info('Database query completed. Employee found: ' . ($employee ? 'Yes' : 'No'));
        
        if (!$employee) {
            Log::warning('Employee not found or inactive for ID: ' . $request->emp_id);
            return back()->withErrors([
                'emp_id' => 'Employee ID not found or account is inactive.',
            ])->withInput($request->only('emp_id'));
        }
        
        Log::info('Employee found: ' . $employee->Emp_ID . ', checking password...');
        
        if ($request->password !== $employee->Emp_Pass) {
            Log::warning('Password mismatch for employee: ' . $employee->Emp_ID);
            return back()->withErrors([
                'password' => 'Invalid password.',
            ])->withInput($request->only('emp_id'));
        }
        
        Log::info('Password verified, logging in employee: ' . $employee->Emp_ID);
        
        // Log the user in
        Auth::guard('employee')->login($employee);
        
        // Regenerate session
        $request->session()->regenerate();
        
        // Add debugging
        Log::info('Login successful for employee: ' . $employee->Emp_ID);
        Log::info('Employee role - isAdmin: ' . $employee->isAdmin . ', isMedEmp: ' . $employee->isMedEmp);
        Log::info('Employee name data - First_Name: ' . ($employee->First_Name ?? 'NULL') . ', Last_Name: ' . ($employee->Last_Name ?? 'NULL'));
        Log::info('Auth check after login: ' . (Auth::guard('employee')->check() ? 'true' : 'false'));
        
        // Redirect based on role
        return $this->redirectBasedOnRole($employee);
    }
    
    protected function redirectBasedOnRole(Employee $employee)
    {
        // Transform employee data to match User interface format
        $userData = [
            'id' => intval($employee->Emp_ID),
            'name' => trim(($employee->First_Name ?? '') . ' ' . ($employee->Last_Name ?? '')),
            'email' => $employee->Emp_ID . '@bjmp.local',
            'avatar' => null,
            'email_verified_at' => null,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            // Keep original employee fields for compatibility
            'Emp_ID' => $employee->Emp_ID,
            'First_Name' => $employee->First_Name,
            'Last_Name' => $employee->Last_Name,
            'full_name' => trim(($employee->First_Name ?? '') . ' ' . ($employee->Last_Name ?? '')),
            'isActive' => $employee->isActive,
            'isAdmin' => $employee->isAdmin,
            'isMedEmp' => $employee->isMedEmp,
        ];

        if ($employee->isAdmin == 1) {
            Log::info('Redirecting admin to: /dashboard');
            return redirect('/dashboard');
        } elseif ($employee->isMedEmp == 1) {
            Log::info('Redirecting medical employee to: /medical/dashboard');
            return redirect('/medical/dashboard');
        } else {
            Log::info('Redirecting regular employee to: /employee/dashboard');
            return redirect('/employee/dashboard');
        }
    }
    
    public function logout(Request $request)
    {
        Log::info('Logout attempt for user: ' . Auth::guard('employee')->id());
        
        // Ensure we have an authenticated user
        if (!Auth::guard('employee')->check()) {
            Log::warning('Logout attempted but no authenticated user found');
            return redirect('/login');
        }
        
        Auth::guard('employee')->logout();
        
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        Log::info('Logout successful, redirecting to login');
        
        if ($request->wantsJson() || $request->header('X-Inertia')) {
            return Inertia::location('/login');
        }
        
        return redirect('/login')->with('message', 'You have been logged out successfully.');
    }
    
    public function user()
    {
        return response()->json(Auth::guard('employee')->user());
    }
}