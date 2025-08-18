<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $table = 'tbl_activities';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    protected $fillable = [
        'date',
        'User_ID',
        'Activity',
        'time'
    ];

    protected $casts = [
        'ID' => 'integer',
        'date' => 'date',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(Employee::class, 'User_ID', 'Emp_ID');
    }
}
