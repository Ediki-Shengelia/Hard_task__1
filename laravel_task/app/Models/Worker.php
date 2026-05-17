<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Worker extends Model
{
    protected $fillable = ['name', 'is_active'];
    public function service()
    {
        return $this->hasMany(Service::class);
    }
}
