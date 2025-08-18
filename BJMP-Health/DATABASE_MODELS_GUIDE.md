# Database Models Guide

## Overview
Your Laravel project now has Eloquent models for all existing database tables in `bjmphrmsdb`. These models allow you to interact with your existing data without needing to run migrations.

## Created Models

### Main Models
1. **Employee** (`tbl_employee`) - Main employee records
2. **User** (`users`) - System users (already existed)

### Medical Records
3. **MedRecord** (`tbl_medrecord`) - General medical records
4. **MedHistory** (`tbl_med_history`) - Medical history records
5. **DentalRecord** (`tbl_dental_record`) - Dental examination records
6. **DentalRecords** (`tbl_dental_records`) - Additional dental records
7. **Vaccination** (`tbl_vaccination`) - Vaccination records
8. **Imaging** (`tbl_imaging`) - Medical imaging records

### Laboratory Tests
9. **Laboratory** (`tbl_laboratory`) - General lab tests
10. **LabBloodChem** (`lab_blood_chem`) - Blood chemistry tests
11. **LabBloodCount** (`lab_blood_count`) - Blood count tests
12. **LabClinicMic** (`lab_clinic_mic`) - Clinical microscopy tests

### System Models
13. **Activity** (`tbl_activities`) - Activity logs
14. **Note** (`tbl_notes`) - Notes and comments
15. **Otp** (`tbl_otp`) - OTP verification
16. **AboutUs** (`tbl_about_us`) - About us content
17. **Help** (`tbl_help`) - Help documentation

## Usage Examples

### Basic Operations

```php
// Get all employees
$employees = Employee::all();

// Find specific employee
$employee = Employee::find(1);

// Get employee with medical records
$employee = Employee::with('medicalRecords')->find(1);

// Create new medical record
$medRecord = MedRecord::create([
    'employee_id' => 1,
    'record_type' => 'checkup',
    'medical_data' => 'Regular health checkup',
    'visit_date' => now()
]);
```

### Relationships

```php
// Get all medical records for an employee
$employee = Employee::find(1);
$medicalRecords = $employee->medicalRecords;
$vaccinations = $employee->vaccinations;
$labTests = $employee->laboratoryTests;

// Get employee from medical record
$medRecord = MedRecord::find(1);
$employee = $medRecord->employee;
```

### Queries

```php
// Get recent vaccinations
$recentVaccinations = Vaccination::where('vaccination_date', '>=', now()->subMonths(6))->get();

// Get employees with their latest medical records
$employees = Employee::with(['medicalRecords' => function($query) {
    $query->latest('visit_date');
}])->get();

// Get lab results for specific employee
$bloodTests = LabBloodChem::where('employee_id', 1)
    ->orderBy('test_date', 'desc')
    ->get();
```

## Important Notes

1. **No Migrations Needed**: These models work with your existing database structure.

2. **Customize Fields**: Update the `$fillable` arrays in each model to match your actual table columns.

3. **Primary Keys**: If your tables use different primary key names (not 'id'), add this to your models:
   ```php
   protected $primaryKey = 'your_primary_key_name';
   ```

4. **Timestamps**: If your tables don't have `created_at` and `updated_at` columns, add this:
   ```php
   public $timestamps = false;
   ```

5. **Table Prefixes**: All models are configured with the correct table names including the `tbl_` prefix.

## Next Steps

1. **Verify Field Names**: Check your actual database schema and update the `$fillable` arrays in each model to match your column names.

2. **Add Validation**: Consider adding form request classes for data validation.

3. **Create Controllers**: Generate controllers for your models:
   ```bash
   php artisan make:controller EmployeeController --resource
   ```

4. **Test Connections**: Test that models can retrieve data from your existing tables.

## Testing Your Models

You can test your models using Tinker:

```bash
php artisan tinker
```

Then try:
```php
// Test employee model
Employee::count()
Employee::first()

// Test relationships
$emp = Employee::first();
$emp->medicalRecords;
```

All your existing data is now accessible through these Eloquent models!
