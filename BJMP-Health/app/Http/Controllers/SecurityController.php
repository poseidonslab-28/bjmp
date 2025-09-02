<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class SecurityController extends Controller
{
   public function show($empId)
    {
        // Fetch employee by Emp_ID from tbl_employee
        $employee = DB::table('tbl_employee')
            ->where('Emp_ID', $empId)
            ->first();

        // If not found, return 404 or redirect
        if (!$employee) {
            return redirect()->back()->with('error', 'Employee not found.');
        }

        // Pass data to Inertia page
        return Inertia::render('Security/Show', [
            'employee' => $employee,
        ]);
    }
}
?>