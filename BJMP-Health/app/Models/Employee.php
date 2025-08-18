<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Employee extends Authenticatable
{
    use Notifiable;
    
    protected $table = 'tbl_employee';
    
    public function medHistories()
    {
        return $this->hasMany(MedHistory::class, 'Patient_ID', 'Emp_ID');
    }
    
    protected $fillable = [
        'Emp_ID',
        'Emp_Pass',
        'First_Name',
        'Middle_Name',
        'Last_Name',
        'isFemale',
        'isAdmin',
        'isMedEmp',
        'Picture_ID',
        'Suffix',
        'City',
        'Barangay',
        'Street_Address',
        'House_No',
        'Province',
        'Zip_Code',
        'Age',
        'Birth_Date',
        'Birth_Place',
        'Religion',
        'Civil_Status',
        'Contact_No',
        'Office_Jail',
        'Email',
        'Contact_Person',
        'C_P_Address',
        'C_P_Relationship',
        'C_P_Contact',
        'Height',
        'Weight',
        'BMI',
        'BMI_Class',
        'Phy_classification',
        'Allergies',
        'Ph_health',
        'Blood_Type',
        'isActive',
        'Position_Code',
        'Position',
        'lastPassword',
        'lastEmail',
        'verified',
        'has_agreed_to_policy'
        // Note: 'password' is not in fillable to prevent mass assignment
    ];
    
    protected $hidden = [
        'Emp_Pass', // Hide password from serialization
    ];
    
    protected $casts = [
        'Birth_Date' => 'date',
        'Date_Added' => 'datetime',
        'Height' => 'decimal:2',
        'Weight' => 'decimal:2',
        'BMI' => 'decimal:2',
        'isFemale' => 'boolean',
        'isAdmin' => 'boolean',
        'isMedEmp' => 'boolean',
        'isActive' => 'boolean',
        'verified' => 'boolean',
        'has_agreed_to_policy' => 'boolean',
    ];
    public $timestamps = false;
    
    protected $primaryKey = 'Emp_ID';
    public $incrementing = false; 
    protected $keyType = 'string';
    
    public function getFullNameAttribute()
    {
        $name = trim($this->First_Name . ' ' . $this->Middle_Name . ' ' . $this->Last_Name);
        if ($this->Suffix) {
            $name .= ' ' . $this->Suffix;
        }
        return $name;
    }
    
    public function getAddressAttribute()
    {
        $address_parts = array_filter([
            $this->House_No,
            $this->Street_Address,
            $this->Barangay,
            $this->City,
            $this->Province,
            $this->Zip_Code
        ]);
        return implode(', ', $address_parts);
    }
    
    public function getBmiStatusAttribute()
    {
        return $this->BMI_Class;
    }
    
    // Authentication methods
    public function getAuthIdentifierName()
    {
        return 'Emp_ID';
    }
    
    public function getAuthPassword()
    {
        return $this->Emp_Pass;
    }
    
    public function getEmailForPasswordReset()
    {
        return $this->Email;
    }
    
    
    public function getRememberToken()
    {
        return null; 
    }

    
    public function setRememberToken($value)
    {
    }

    
    public function getRememberTokenName()
    {
        return null; 
    }
    
    // Role checking methods
    public function isAdmin()
    {
        return $this->isAdmin == 1;
    }
    
    public function isMedicalEmployee()
    {
        return $this->isMedEmp == 1;
    }
    
    public function isRegularEmployee()
    {
        return !$this->isAdmin() && !$this->isMedicalEmployee();
    }
    
    public function getRole()
    {
        if ($this->isAdmin()) {
            return 'admin';
        } elseif ($this->isMedicalEmployee()) {
            return 'medical';
        } else {
            return 'employee';
        }
    }

    // Relationships
    public function dentalRecords()
    {
        return $this->hasMany(DentalRecord::class, 'employee_id', 'Emp_ID');
    }
    
    public function dentalRecordsData()
    {
        return $this->hasMany(DentalRecords::class, 'employee_id', 'Emp_ID');
    }
    
    public function laboratoryTests()
    {
        return $this->hasMany(Laboratory::class, 'employee_id', 'Emp_ID');
    }
    
    public function medicalRecords()
    {
        return $this->hasMany(MedRecord::class, 'employee_id', 'Emp_ID');
    }
    
    public function medicalHistory()
    {
        return $this->hasMany(MedHistory::class, 'employee_id', 'Emp_ID');
    }
    
    public function vaccinations()
    {
        return $this->hasMany(Vaccination::class, 'employee_id', 'Emp_ID');
    }
    
    public function imaging()
    {
        return $this->hasMany(Imaging::class, 'employee_id', 'Emp_ID');
    }
    
    public function notes()
    {
        return $this->hasMany(Note::class, 'employee_id', 'Emp_ID');
    }
    
    public function bloodChemTests()
    {
        return $this->hasMany(LabBloodChem::class, 'employee_id', 'Emp_ID');
    }
    
    public function bloodCountTests()
    {
        return $this->hasMany(LabBloodCount::class, 'employee_id', 'Emp_ID');
    }
    
    public function clinicMicTests()
    {
        return $this->hasMany(LabClinicMic::class, 'employee_id', 'Emp_ID');
    }
}
