<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaccination extends Model
{
    use HasFactory;

    protected $table = 'tbl_vaccination';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    protected $fillable = [
        'Emp_ID',
        'Record_ID',
        'Patient_ID',
        'Date',
        'Vaccine',
        'Venue',
        'File',
        'archived'
    ];

    protected $casts = [
        'ID' => 'integer',
        'Record_ID' => 'integer',
        'Date' => 'date',
        'archived' => 'boolean',
    ];

    // Relationships
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'Emp_ID', 'Emp_ID');
    }

    public function patient()
    {
        return $this->belongsTo(Employee::class, 'Patient_ID', 'Emp_ID');
    }

    public function medRecord()
    {
        return $this->belongsTo(MedRecord::class, 'Record_ID', 'ID');
    }

    // Scope for non-archived records
    public function scopeActive($query)
    {
        return $query->where('archived', false);
    }
}
