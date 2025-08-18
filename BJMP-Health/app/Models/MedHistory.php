<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedHistory extends Model
{
    use HasFactory;

    protected $table = 'tbl_med_history';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    protected $fillable = [
        'Patient_ID',
        'Record_ID',
        'Present_HC',
        'Past_HC',
        'Allergies',
        'Family_HH',
        'Current_M',
        'Other',
        'Pediatric_H',
        'Major_AI',
        'Surgery',
        'Serious_PI',
        'Limitation',
        'Med_H',
        'Transfusion_H',
        'Mental_P',
        'Smoker_Freq',
        'Alcohol_Freq',
        'G',
        'P',
        'LMP',
        'blood',
        'physical'
    ];

    protected $attributes = [
        'Present_HC' => '',
        'Past_HC' => '',
        'Allergies' => '',
        'Family_HH' => '',
        'Current_M' => '',
        'Other' => '',
        'Pediatric_H' => '',
        'Major_AI' => '',
        'Surgery' => '',
        'Serious_PI' => '',
        'Limitation' => '',
        'Med_H' => '',
        'Transfusion_H' => '',
        'Mental_P' => '',
        'Smoker_Freq' => '',
        'Alcohol_Freq' => '',
        'G' => '',
        'P' => '',
        'LMP' => '',
        'blood' => '',
        'physical' => ''
    ];

    protected $casts = [
        'ID' => 'integer',
        'Record_ID' => 'integer',
    ];

    // Relationships
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'Patient_ID', 'Emp_ID');
    }

    public function medRecord()
    {
        return $this->belongsTo(MedRecord::class, 'Record_ID', 'ID');
    }
}
