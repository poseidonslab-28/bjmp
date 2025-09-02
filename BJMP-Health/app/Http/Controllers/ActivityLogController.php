<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ActivityLogController extends Controller
{
    public function show()
    {
        // Use the correct column for the logged-in user
        $userId = auth()->user()?->Emp_ID; // or User_ID if that's correct

        if (!$userId) {
            return Inertia::render('activity-log', [
                'activities' => [],
                'employee' => auth()->user(),
                'flash' => ['error' => 'User not authenticated.'],
            ]);
        }

        try {
            $activities = DB::table('tbl_activities')
                ->where('User_ID', $userId)
                ->orderByDesc('date')
                ->orderByDesc('time')
                ->get();

            return Inertia::render('activity-log', [
                'activities' => $activities,
                'employee' => auth()->user(),
                'flash' => [
                    'success' => session('success'),
                    'error' => session('error'),
                ],
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to fetch activities: ' . $e->getMessage());
            return Inertia::render('activity-log', [
                'activities' => [],
                'employee' => auth()->user(),
                'flash' => ['error' => 'Failed to load activity log.'],
            ]);
        }
    }
}
