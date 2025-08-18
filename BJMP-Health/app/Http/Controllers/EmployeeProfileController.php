<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Inertia\Inertia;
use Illuminate\Http\Request;

class EmployeeProfileController extends Controller
{

    public function dashboard()
    {
        $employees = Employee::all();
        $activeCount = Employee::where('isActive', 1)->count();
        $medicalPersonnelCount = Employee::where('isMedEmp', 1)->count();
        $physicalFitnessClassA = Employee::where('phy_classification', 'A')->count();
        $physicalFitnessClassB1 = Employee::where('phy_classification', 'B1')->count();
        $physicalFitnessClassB2 = Employee::where('phy_classification', 'B2')->count();
        $physicalFitnessClassC = Employee::where('phy_classification', 'C')->count();
        $physicalFitnessClassD = Employee::where('phy_classification', 'D')->count();
        $physicalFitnessClassX = Employee::where('phy_classification', 'X')->count();
        $bmiUnderweight = Employee::where('BMI_Class', 'Underweight')->count();
        $bmiNormal = Employee::where('BMI_Class', 'Normal')->count();
        $bmiOverweight = Employee::where('BMI_Class', 'Overweight')->count();
        $bmiObeseClassI = Employee::where('BMI_Class', 'Obese Class I')->count();
        $bmiObeseClassII = Employee::where('BMI_Class', 'Obese Class II')->count();
        $bmiObeseClassIII = Employee::where('BMI_Class', 'Obese Class III')->count();
        $employee = Employee::first();


        return Inertia::render('dashboard', [
            'employees' => $employees,
            'activeCount' => $activeCount,
            'medicalPersonnelCount' => $medicalPersonnelCount,
            'physicalFitnessClassA' => $physicalFitnessClassA,
            'physicalFitnessClassB1' => $physicalFitnessClassB1,
            'physicalFitnessClassB2' => $physicalFitnessClassB2,
            'physicalFitnessClassC' => $physicalFitnessClassC,
            'physicalFitnessClassD' => $physicalFitnessClassD,
            'physicalFitnessClassX' => $physicalFitnessClassX,
            'bmiUnderWeight' => $bmiUnderweight,
            'bmiNormal' => $bmiNormal,
            'bmiOverweight' => $bmiOverweight,
            'bmiObeseClassI' => $bmiObeseClassI,
            'bmiObeseClassII' => $bmiObeseClassII,
            'bmiObeseClassIII' => $bmiObeseClassIII,
            'employee' => $employee
        ]);
    }


    public function index()
    {
        // Fetch only employees where isMedEmp = true (or 1)
        $employees = Employee::where('isMedEmp', 0)->get();

        // Pass data to Inertia
        return Inertia::render('employee-account', [
            'employees' => $employees,
        ]);

    }
    public function active()
    {
        $employees = Employee::where('isActive', true)->get();

        return Inertia::render('employee-account', [
            'employees' => $employees,
        ]);
    }
    public function show($empId)
    {
        $employee = Employee::where('Emp_ID', $empId)->firstOrFail();

        return inertia('employee-account/personal-profile', [
            'employee' => $employee
        ]);
    }

    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);

        $employee->update($request->all());

        return redirect()->back()->with('success', 'Profile updated successfully');
    }

    public function toggleActive($id)
    {
        $employee = Employee::findOrFail($id);
        $employee->isActive = !$employee->isActive; // toggle
        $employee->save();

        return redirect()->back()->with('success', 'Employee status updated');
    }


}
