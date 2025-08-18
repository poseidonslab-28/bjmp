<?php

namespace App\Providers;

use App\Auth\EmployeeUserProvider;
use App\Models\Employee;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register custom user provider for employee authentication
        Auth::provider('employee_plain', function ($app, array $config) {
            return new EmployeeUserProvider($app['hash'], $config['model']);
        });
    }
}
