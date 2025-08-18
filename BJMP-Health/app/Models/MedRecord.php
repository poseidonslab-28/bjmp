<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedRecord extends Model
{
    use HasFactory;

    protected $table = 'tbl_medrecord';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    protected $fillable = [
        'Emp_ID',
        'Date'
    ];

    protected $casts = [
        'ID' => 'integer',
        'Date' => 'date',
    ];

    // Relationships
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'Emp_ID', 'Emp_ID');
    }

    public function medHistories()
    {
        return $this->hasMany(MedHistory::class, 'Record_ID', 'ID');
    }

    public function laboratories()
    {
        return $this->hasMany(Laboratory::class, 'Record_ID', 'ID');
    }

    public function vaccinations()
    {
        return $this->hasMany(Vaccination::class, 'Record_ID', 'ID');
    }

    public function notes()
    {
        return $this->hasMany(Note::class, 'Record_ID', 'ID');
    }
}
