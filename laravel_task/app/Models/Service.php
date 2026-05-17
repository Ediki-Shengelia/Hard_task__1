<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    // app/Models/Service.php
    protected $fillable = [
        'title',
        'start_time',
        'end_time',
        'price',
        'worker_id',
    ];
    public function worker()
    {
        return $this->belongsTo(Worker::class);
    }
}
