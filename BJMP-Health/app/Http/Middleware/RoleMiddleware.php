<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!Auth::guard('employee')->check()) {
            return redirect()->route('login');
        }

        $user = Auth::guard('employee')->user();

        switch ($role) {
            case 'admin':
                if ($user->isAdmin != 1) {
                    abort(403, 'Access denied. Admin privileges required.');
                }
                break;
            case 'medical':
                if ($user->isMedEmp != 1) {
                    abort(403, 'Access denied. Medical personnel privileges required.');
                }
                break;
            case 'employee':
                break;
            default:
                abort(403, 'Invalid role specified.');
        }

        return $next($request);
    }
}
