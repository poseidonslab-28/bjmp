<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LabBloodChem extends Model
{
    use HasFactory;

    protected $table = 'lab_blood_chem';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    protected $fillable = [
        'LAB_ID',
        'FBS_SI',
        'FBS_TU',
        'URIC_AC_SI',
        'URIC_AC_TU',
        'bunSI',
        'bunTU',
        'TOTAL_CHO_SI',
        'TOTAL_CHO_TU',
        'TRYGLYCERIDES_SI',
        'TRYGLYCERIDES_TU',
        'HDL_SI',
        'HDL_TU',
        'LDL_SI',
        'LDL_TU',
        'VLDL_SI',
        'VLDL_TU',
        'SGPT_SI',
        'SGPT_TU',
        'SGOT_SI',
        'SGOT_TU',
        'SGOT',
        'HBSAG',
        'VDRL',
        'ECG',
        'CXR',
        'DT',
        'PT',
        'creaSI',
        'creaTU'
    ];

    protected $casts = [
        'ID' => 'integer',
    ];

    // Relationships
    public function laboratory()
    {
        return $this->belongsTo(Laboratory::class, 'LAB_ID', 'ID');
    }
}
