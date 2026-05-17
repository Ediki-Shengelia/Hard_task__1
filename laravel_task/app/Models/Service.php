<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = ['worker_id', 'title', 'price', 'start_time', 'end_time'];
    public function worker()
    {
        return $this->belongsTo(Worker::class);
    }
}
