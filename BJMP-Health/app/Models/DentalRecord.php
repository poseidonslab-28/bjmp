<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DentalRecord extends Model
{
    use HasFactory;

    protected $table = 'tbl_dental_record';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    protected $fillable = [
        'Patient_ID',
        'Emp_ID',
        // Tooth numbers as individual fields
        '18', '17', '16', '15', '14', '13', '12', '11',
        '21', '22', '23', '24', '25', '26', '27', '28',
        '48', '47', '46', '45', '44', '43', '42', '41',
        '31', '32', '33', '34', '35', '36', '37', '38'
    ];

    protected $casts = [
        'ID' => 'integer',
    ];

    // Relationships
    public function patient()
    {
        return $this->belongsTo(Employee::class, 'Patient_ID', 'Emp_ID');
    }

    public function dentist()
    {
        return $this->belongsTo(Employee::class, 'Emp_ID', 'Emp_ID');
    }

    // Helper methods for tooth data
    public function getUpperTeeth()
    {
        return [
            '18' => $this->{'18'}, '17' => $this->{'17'}, '16' => $this->{'16'}, '15' => $this->{'15'},
            '14' => $this->{'14'}, '13' => $this->{'13'}, '12' => $this->{'12'}, '11' => $this->{'11'},
            '21' => $this->{'21'}, '22' => $this->{'22'}, '23' => $this->{'23'}, '24' => $this->{'24'},
            '25' => $this->{'25'}, '26' => $this->{'26'}, '27' => $this->{'27'}, '28' => $this->{'28'}
        ];
    }

    public function getLowerTeeth()
    {
        return [
            '48' => $this->{'48'}, '47' => $this->{'47'}, '46' => $this->{'46'}, '45' => $this->{'45'},
            '44' => $this->{'44'}, '43' => $this->{'43'}, '42' => $this->{'42'}, '41' => $this->{'41'},
            '31' => $this->{'31'}, '32' => $this->{'32'}, '33' => $this->{'33'}, '34' => $this->{'34'},
            '35' => $this->{'35'}, '36' => $this->{'36'}, '37' => $this->{'37'}, '38' => $this->{'38'}
        ];
    }
}
