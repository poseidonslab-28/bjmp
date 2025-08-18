<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $employee = $request->user('employee');
        $userData = null;
        
        if ($employee) {
            $userData = [
                'id' => $employee->Emp_ID,
                'Emp_ID' => $employee->Emp_ID,
                'First_Name' => $employee->First_Name,
                'Last_Name' => $employee->Last_Name,
                'Emp_FName' => $employee->First_Name, // Fallback mapping
                'Emp_LName' => $employee->Last_Name,  // Fallback mapping
                'name' => $employee->First_Name . ' ' . $employee->Last_Name,
                'email' => $employee->Email ?? $employee->Emp_ID . '@bjmp.local',
                'isAdmin' => $employee->isAdmin,
                'isMedEmp' => $employee->isMedEmp,
                'isActive' => $employee->isActive,
                'Position' => $employee->Position ?? '',
                'Office_Jail' => $employee->Office_Jail ?? '',
            ];
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $userData,
            ],
            'csrf_token' => $request->session()->token(),
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
