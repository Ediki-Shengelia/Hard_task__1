<?php

namespace App\Http\Controllers;

use App\Models\Worker;
use DateTime;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }
    public static function calculateWorkingCost(DateTime $start, string $title, float $pricePerMinute)
    {
        $services = [
            ['title' => 'Engine service', 'start' => (clone $start)->modify('+2 days'),                  'duration' => 48 * 60],
            ['title' => 'Fuel service',   'start' => (clone $start)->modify('+1 hour'),                  'duration' => 1 * 60],
            ['title' => 'Item service',   'start' => (clone $start)->modify('+125 minutes'),             'duration' => 125],
            ['title' => 'Electrical',     'start' => (clone $start)->modify('+24 hours +30 minutes'),    'duration' => 24.5 * 60],
        ];

        foreach ($services as $service) {
            if ($title === $service['title']) {
                $end          = $service['start'];
                $totalMinutes = ($end->getTimestamp() - $start->getTimestamp()) / 60;  // ✅ minutes, not hours

                return [
                    'title' => $title,                                                  // ✅ added so store() can use it
                    'start' => $start->format('Y-m-d H:i'),
                    'end'   => $end->format('Y-m-d H:i'),
                    'cost'  => '$' . number_format($totalMinutes * $pricePerMinute, 2), // ✅ correct variable name
                ];
            }
        }

        return null;
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Worker $worker)
    {

        $request->validate([
            'title' => 'required|string',
            'start' => 'required|date',

        ]);

        $start  = new DateTime($request->start);
        $result = $this->calculateWorkingCost($start, $request->title, (float)$request->price);

        $worker->service()->create([
            'title' => $result['title'],
            'start_time' => $result['start'],
            'end_time'   => $result['end'],
        ]);


        return response()->json([
            'message' => "Service saved! Cost: {$result['cost']}"
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
