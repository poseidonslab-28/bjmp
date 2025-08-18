<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laboratory extends Model
{
    use HasFactory;

    protected $table = 'tbl_laboratory';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    protected $fillable = [
        'Emp_ID',
        'examNo',
        'examiNation',
        'Lab_Date',
        'Lab_Taker_ID',
        'Record_ID',
        'archived'
    ];

    protected $casts = [
        'ID' => 'integer',
        'Record_ID' => 'integer',
        'Lab_Date' => 'date',
        'archived' => 'boolean',
    ];

    // Relationships
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'Emp_ID', 'Emp_ID');
    }

    public function labTaker()
    {
        return $this->belongsTo(Employee::class, 'Lab_Taker_ID', 'Emp_ID');
    }

    public function medRecord()
    {
        return $this->belongsTo(MedRecord::class, 'Record_ID', 'ID');
    }

    public function bloodChem()
    {
        return $this->hasOne(LabBloodChem::class, 'LAB_ID', 'ID');
    }

    public function bloodCount()
    {
        return $this->hasOne(LabBloodCount::class, 'Lab_ID', 'ID');
    }

    public function clinicMic()
    {
        return $this->hasOne(LabClinicMic::class, 'LAB_ID', 'ID');
    }

    // Scope for non-archived records
    public function scopeActive($query)
    {
        return $query->where('archived', false);
    }
}
