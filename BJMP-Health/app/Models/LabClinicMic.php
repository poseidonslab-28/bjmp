<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LabClinicMic extends Model
{
    use HasFactory;

    protected $table = 'lab_clinic_mic';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    protected $fillable = [
        'LAB_ID',
        'Urinalysis',
        'Fecalysis'
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
