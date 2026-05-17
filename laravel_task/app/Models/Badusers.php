<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Badusers extends Model
{
    protected $fillable = ['service', 'delay_time', 'started_time'];
}
