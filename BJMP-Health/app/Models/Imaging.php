<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Imaging extends Model
{
    use HasFactory;

    protected $table = 'tbl_imaging';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    protected $fillable = [
        'Emp_ID',
        'Image_Taker_ID',
        'Date',
        'Imaging_Proc',
        'File',
        'archived'
    ];

    protected $casts = [
        'ID' => 'integer',
        'Date' => 'date',
        'archived' => 'boolean',
    ];

    // Relationships
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'Emp_ID', 'Emp_ID');
    }

    public function imageTaker()
    {
        return $this->belongsTo(Employee::class, 'Image_Taker_ID', 'Emp_ID');
    }

    public function scopeActive($query)
    {
        return $query->where('archived', false);
    }
}
