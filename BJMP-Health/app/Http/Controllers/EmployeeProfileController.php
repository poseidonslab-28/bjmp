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


    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|string|max:50|unique:tbl_employee,Emp_Id',
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => 'required|string',
            'is_medical_employee' => 'required|boolean',
            'picture_id' => 'nullable|string|max:255',
            'suffix' => 'nullable|string|max:50',
            'city' => 'required|string|max:255',
            'barangay' => 'nullable|string|max:255',
            'street_address' => 'nullable|string|max:255',
            'house_no' => 'nullable|string|max:50',
            'province' => 'nullable|string|max:255',
            'zip_code' => 'nullable|string|max:20',
            'age' => 'nullable|integer',
            'birthdate' => 'required|date',
            'birth_place' => 'nullable|string|max:255',
            'religion' => 'nullable|string|max:100',
            'civil_status' => 'required|string',
            'contact_no' => 'nullable|string|max:20',
            'office_jail' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'contact_person' => 'nullable|string|max:255',
            'contact_p_address' => 'nullable|string|max:255',
            'contact_p_relationship' => 'nullable|string|max:255',
            'contact_p_contact' => 'nullable|string|max:20',
            'height' => 'nullable|numeric',
            'weight' => 'nullable|numeric',
            'physical_classification' => 'nullable|string|max:255',
            'allergies' => 'nullable|string|max:255',
            'philhealth' => 'nullable|string|max:50',
            'blood_type' => 'nullable|string|max:5',
            'date_added' => 'required|date',
            'position_code' => 'required|string|max:50',
            'position' => 'required|string|max:255',
        ]);

        try {
            // Auto calculate BMI
            $height = $validated['height'] ?? null;
            $weight = $validated['weight'] ?? null;
            $bmi = ($height && $weight) ? round($weight / (($height / 100) ** 2), 2) : null;

            $bmi_class = match (true) {
                $bmi !== null && $bmi < 18.5 => 'Underweight',
                $bmi !== null && $bmi < 24.9 => 'Normal',
                $bmi !== null && $bmi < 29.9 => 'Overweight',
                $bmi !== null => 'Obese',
                default => null,
            };

            Employee::create([
                'Emp_ID' => $validated['employee_id'],
                'First_Name' => $validated['first_name'],
                'Middle_Name' => $validated['middle_name'] ?? null,
                'Last_Name' => $validated['last_name'],
                'Gender' => $validated['gender'],
                'Is_Medical_Employee' => $validated['is_medical_employee'],
                'Picture_ID' => $validated['picture_id'] ?? null,
                'Suffix' => $validated['suffix'] ?? null,
                'City' => $validated['city'],
                'Baranggay' => $validated['barangay'] ?? null,
                'Street_Address' => $validated['street_address'] ?? null,
                'House_No' => $validated['house_no'] ?? null,
                'Province' => $validated['province'] ?? null,
                'Zip_Code' => $validated['zip_code'] ?? null,
                'Age' => $validated['age'] ?? null,
                'Birthdate' => $validated['birthdate'],
                'Birth_Place' => $validated['birth_place'] ?? null,
                'Religion' => $validated['religion'] ?? null,
                'Civil_Status' => $validated['civil_status'],
                'Contact_No' => $validated['contact_no'] ?? null,
                'Office_Jail' => $validated['office_jail'] ?? null,
                'Email' => $validated['email'] ?? null,
                'Contact_Person' => $validated['contact_person'] ?? null,
                'Contact_P_Address' => $validated['contact_p_address'] ?? null,
                'Contact_P_Relationship' => $validated['contact_p_relationship'] ?? null,
                'Contact_P_Contact' => $validated['contact_p_contact'] ?? null,
                'Height' => $height,
                'Weight' => $weight,
                'BMI' => $bmi,
                'BMI_Class' => $bmi_class,
                'Physical_Classification' => $validated['physical_classification'] ?? null,
                'Allergies' => $validated['allergies'] ?? null,
                'Philhealth' => $validated['philhealth'] ?? null,
                'Blood_Type' => $validated['blood_type'] ?? null,
                'Date_Added' => $validated['date_added'],
                'Position_Code' => $validated['position_code'],
                'Position' => $validated['position'],
            ]);

            return redirect()
                ->back() // safer than ->back()
                ->with('success', 'Employee added successfully!');
        } catch (\Exception $e) {
            \Log::error('Employee store failed: ' . $e->getMessage());
            return redirect()->back()->with(
                'error',
                'Failed to add employee. Please try again. ' . $e->getMessage()
            );
        }
    }




}
