<?php

namespace App\Http\Controllers;

use App\Models\Badusers;
use Illuminate\Http\Request;

class BadController extends Controller
{
    public function store(Request $request)
    {
        Badusers::create([
            'service'      => $request->service,
            'started_time' => $request->started_time,
            'delay_time'   => $request->delay_time,
        ]);

        return response()->json(['message' => "Good Luck"]);
    }
}
