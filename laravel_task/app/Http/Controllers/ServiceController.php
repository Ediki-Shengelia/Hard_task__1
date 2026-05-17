<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Worker;
use DateTime;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::all();
        return response()->json($services);
    }

    public static function calculateWorkingCost(DateTime $start, string $title)
    {
        $pricePerMinute = 1;

        $services = [
            ['title' => 'Engine service', 'start' => (clone $start)->modify('+2 days')],
            ['title' => 'Fuel service',   'start' => (clone $start)->modify('+1 hour')],
            ['title' => 'Item service',   'start' => (clone $start)->modify('+125 minutes')],
            ['title' => 'Electrical',     'start' => (clone $start)->modify('+24 hours +30 minutes')],
        ];

        foreach ($services as $service) {
            if ($title === $service['title']) {
                $end          = $service['start'];
                $totalMinutes = ($end->getTimestamp() - $start->getTimestamp()) / 60;

                return [
                    'title' => $title,
                    'start' => $start->format('Y-m-d H:i'),
                    'end'   => $end->format('Y-m-d H:i'),
                    'cost'  => round($totalMinutes * $pricePerMinute, 2),
                ];
            }
        }

        return null;
    }

    public function store(Request $request, Worker $worker)
    {
        $request->validate([
            'title' => 'required|string',
            'start' => 'required|date',
        ]);

        $start  = new DateTime($request->start);
        $result = $this->calculateWorkingCost($start, $request->title);

        if (!$result) {
            return response()->json([
                'message' => 'Service title not found. Valid titles: Engine service, Fuel service, Item service, Electrical'
            ], 422);
        }

        $worker->service()->create([
            'title'      => $result['title'],
            'start_time' => $result['start'],
            'end_time'   => $result['end'],
            'price'      => $result['cost'],
        ]);

        return response()->json([
            'message' => "Service saved! Cost: $" . $result['cost']
        ]);
    }

    public function show(string $id) {}
    public function update(Request $request, string $id) {}
    public function destroy(Service $service)
    {
        $service->delete();
        return response()->json([
            'message' => "Deleted"
        ]);
    }
}
