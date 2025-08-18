<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DentalRecords extends Model
{
    use HasFactory;

    protected $table = 'tbl_dental_records';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    protected $fillable = [
        'Date',
        'Dentist',
        'Patient',
        'Procedure',
        'Remarks',
        'archived'
    ];

    protected $casts = [
        'ID' => 'integer',
        'Date' => 'date',
        'archived' => 'boolean',
    ];

    // Relationships
    public function dentist()
    {
        return $this->belongsTo(Employee::class, 'Dentist', 'Emp_ID');
    }

    public function patient()
    {
        return $this->belongsTo(Employee::class, 'Patient', 'Emp_ID');
    }

    // Scope for non-archived records
    public function scopeActive($query)
    {
        return $query->where('archived', false);
    }
}
