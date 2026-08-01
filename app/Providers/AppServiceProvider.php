<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route; // Asegúrate de importar Route
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use App\Http\Middleware\AdminMiddleware; // Asegúrate de importar el middleware

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
        // Configuración de Vite
        Vite::prefetch(concurrency: 3);

        // Registrar alias de middleware
        Route::aliasMiddleware('admin', AdminMiddleware::class);
    }
}
