<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Help extends Model
{
    use HasFactory;

    protected $table = 'tbl_help';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    protected $fillable = [
        'Date',
        'Doc_Name',
        'Doc_File'
    ];

    protected $casts = [
        'ID' => 'integer',
        'Date' => 'date',
    ];
}
