<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Verifica si el usuario está autenticado y si es administrador
        if (Auth::check() && Auth::user()->rol === 1) {
            return $next($request); // Continúa con la solicitud si es admin
        }

        // Redirige a una página de error o muestra un mensaje de acceso denegado
        return redirect('/')->with('error', 'Acceso denegado. Solo administradores.');
    }
}
