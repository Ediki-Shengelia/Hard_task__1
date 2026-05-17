<?php

namespace App\Http\Controllers;

use App\Models\Badusers;
use Illuminate\Http\Request;

class BadController extends Controller
{
    public function store(Request $request)
    {
        Badusers::create([
            'service' => $request->service,
            'started_time' => $request->start_time
        ]);
    re
    }
}
