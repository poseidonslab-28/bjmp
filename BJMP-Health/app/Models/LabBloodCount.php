<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LabBloodCount extends Model
{
    use HasFactory;

    protected $table = 'lab_blood_count';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    protected $fillable = [
        'Lab_ID',
        'Hemo_SI',
        'Hemo_TU',
        'Herma_SI',
        'Herma_TU',
        'RBC_SI',
        'RBC_TU',
        'WBC_SI',
        'WBC_TU',
        'PlateLet_SI',
        'PlateLet_TU',
        'Lymphocytes_SI',
        'Lymphocytes_TU',
        'Neutrophil_SI',
        'Neutrophil_TU',
        'Basophil_SI',
        'Basophil_TU',
        'Edsinophil_SI',
        'Edsinophil_TU'
    ];

    protected $casts = [
        'ID' => 'integer',
    ];

    // Relationships
    public function laboratory()
    {
        return $this->belongsTo(Laboratory::class, 'Lab_ID', 'ID');
    }
}
