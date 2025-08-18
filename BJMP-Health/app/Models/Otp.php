<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Otp extends Model
{
    use HasFactory;

    protected $table = 'tbl_otp';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    protected $fillable = [
        'otp',
        'date',
        'requestor',
        'isActivated'
    ];

    protected $casts = [
        'ID' => 'integer',
        'date' => 'date',
        'isActivated' => 'boolean',
    ];

    // Relationships
    public function requestor()
    {
        return $this->belongsTo(Employee::class, 'requestor', 'Emp_ID');
    }

    // Scope for active OTPs
    public function scopeActive($query)
    {
        return $query->where('isActivated', true);
    }
}
