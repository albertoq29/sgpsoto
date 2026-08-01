<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpleadoController;
use Inertia\Inertia;
use App\Models\Empleado;
use App\Http\Middleware\AdminMiddleware; // Asegúrate de que este middleware esté implementado
use App\Http\Controllers\BackupController;
use App\Http\Controllers\RespaldoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\IncidenciaController;
use App\Http\Controllers\VariablePagoController;
use App\Http\Controllers\QuincenaController;
use App\Http\Controllers\ExtraSueldoController;
use App\Http\Controllers\Horascontroller;
use App\Http\Controllers\Manualcontroller;
use App\Models\Profesionalizacion;
use App\Models\PrimerQuincena;
use App\Models\SegundaQuincena;
use Illuminate\Support\Facades\DB;
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', function () {
    $empleadosCount = Empleado::count();
    $profesionalizacionCount = Empleado::whereHas('profesionalizacion', function ($query) {
        $query->where('tiene_profesionalizacion', 1);
    })->count();

    $empleadosConHijosCount = Empleado::whereHas('hijos')->count();

    // Calcular gastos para el mes actual
    $currentMonth = now()->month;
    $currentYear = now()->year;

    // Obtener datos detallados de la primera quincena (agregando horas extra, bono nocturno y días feriados)
    $primerQuincenaDetallado = PrimerQuincena::whereMonth('fecha_pago', $currentMonth)
        ->whereYear('fecha_pago', $currentYear)
        ->selectRaw('
            SUM(sueldo_basico_quincenal) as sueldo,
            SUM(prima_profesionalizacion) as profesionalizacion,
            SUM(prima_hijos) as hijos,
            SUM(prima_antiguedad) as antiguedad,
            SUM(horas_extra) as horas_extra,
            SUM(bono_nocturno) as bono_nocturno,
            SUM(dias_feriados) as dias_feriados
        ')
        ->first();

    // Obtener datos detallados de la segunda quincena (agregando horas extra, bono nocturno y días feriados)
    $segundaQuincenaDetallado = SegundaQuincena::whereMonth('fecha_pago', $currentMonth)
        ->whereYear('fecha_pago', $currentYear)
        ->selectRaw('
            SUM(sueldo_basico_quincenal) as sueldo,
            SUM(prima_profesionalizacion) as profesionalizacion,
            SUM(prima_hijos) as hijos,
            SUM(prima_antiguedad) as antiguedad,
            SUM(cestaticket) as cestaticket,
            SUM(horas_extra) as horas_extra,
            SUM(bono_nocturno) as bono_nocturno,
            SUM(dias_feriados) as dias_feriados
        ')
        ->first();

    // Calcular el total de gastos mensuales, incluyendo horas extra, bono nocturno y días feriados
    $gastosMensuales = ($primerQuincenaDetallado->sueldo ?? 0) + 
        ($primerQuincenaDetallado->profesionalizacion ?? 0) +
        ($primerQuincenaDetallado->hijos ?? 0) + 
        ($primerQuincenaDetallado->antiguedad ?? 0) +
        ($primerQuincenaDetallado->horas_extra ?? 0) +
        ($primerQuincenaDetallado->bono_nocturno ?? 0) +
        ($primerQuincenaDetallado->dias_feriados ?? 0) +
        ($segundaQuincenaDetallado->sueldo ?? 0) + 
        ($segundaQuincenaDetallado->profesionalizacion ?? 0) +
        ($segundaQuincenaDetallado->hijos ?? 0) + 
        ($segundaQuincenaDetallado->antiguedad ?? 0) +
        ($segundaQuincenaDetallado->cestaticket ?? 0) +
        ($segundaQuincenaDetallado->horas_extra ?? 0) +
        ($segundaQuincenaDetallado->bono_nocturno ?? 0) +
        ($segundaQuincenaDetallado->dias_feriados ?? 0);

    return Inertia::render('Dashboard', [
        'empleadosCount' => $empleadosCount,
        'profesionalizacionCount' => $profesionalizacionCount,
        'empleadosConHijosCount' => $empleadosConHijosCount,
        'gastosMensuales' => $gastosMensuales,
        'primerQuincenaDetallado' => $primerQuincenaDetallado,
        'segundaQuincenaDetallado' => $segundaQuincenaDetallado,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');


// Rutas de perfil de usuario
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function (){
Route::get('/empleados', [EmpleadoController::class, 'index'])->name('empleados.index');
});
// Rutas de empleados
Route::middleware(['auth', 'admin'])->group(function () {

    Route::get('/empleados/create', [EmpleadoController::class, 'create'])->name('empleados.create');
    Route::post('/empleados', [EmpleadoController::class, 'store'])->name('empleados.store');
    Route::get('/empleados/edit/{id}', [EmpleadoController::class, 'edit'])->name('empleados.edit');
    Route::put('/empleados/update/{id}', [EmpleadoController::class, 'update'])->name('empleados.update');
    Route::delete('/empleados/{id}', [EmpleadoController::class, 'destroy'])->name('empleados.destroy');
});

// Rutas de respaldo
Route::middleware(['auth','admin'])->group(function () {
    Route::get('/backups', [RespaldoController::class, 'index'])->name('backups.index');
    Route::get('Empleado/copia/descarga', [RespaldoController::class, 'copiadescarga'])->name('copia.descarga');
    Route::post('/restore-database', [RespaldoController::class, 'restore'])->name('restore.database');
});

// Ruta para mostrar la vista de respaldo

// rutas de asignacion de roles
Route::middleware(['auth','admin'])->group(function () {
    Route::get('/modify-users', [UserController::class, 'index'])->name('modify-users.index');
    Route::post('/assign-admin/{user}', [UserController::class, 'assignAdmin'])->name('assign-admin');
    Route::delete('/delete-user/{user}', [UserController::class, 'destroy'])->name('delete-user');
    Route::post('/remove-admin/{user}', [UserController::class, 'removeAdmin'])->name('remove-admin');
});






Route::middleware(['auth'])->group(function () {
    Route::get('incidencias', [IncidenciaController::class, 'index'])->name('incidencias.index');
    Route::get('incidencias/crear', [IncidenciaController::class, 'create'])->name('incidencias.create');
    Route::post('incidencias', [IncidenciaController::class, 'store'])->name('incidencias.store');
    Route::get('incidencias/{id}', [IncidenciaController::class, 'show'])->name('incidencias.show'); // Nueva ruta
    Route::delete('/incidencias/{id}', [IncidenciaController::class, 'destroy'])->name('incidencias.destroy');

});



Route::middleware(['auth','admin'])->group(function () {
    Route::resource('variables', VariablePagoController::class);
    
});
Route::middleware(['auth','admin'])->group(function () {
    Route::get('/extrasueldo', [ExtraSueldoController::class, 'index'])->name('extrasueldo.index');
    Route::post('/extrasueldo', [ExtraSueldoController::class, 'store'])->name('extrasueldo.store');
});



Route::middleware(['auth','admin'])->group(function () {
    Route::get('/quincena', [QuincenaController::class, 'index'])->name('quincena.index');
    Route::post('/quincena/registrar', [QuincenaController::class, 'registrar'])->name('quincena.registrar');
// Eliminar quincena
Route::delete('/quincenas/{tipo}/{id}', [QuincenaController::class, 'destroy'])
     ->name('quincena.destroy');


    
});

Route::middleware(['auth'])->group(function () {
Route::get('/empleados/quincenas', [QuincenaController::class, 'listarEmpleados'])->name('quincenas.empleados');
Route::get('/empleados/{id}/quincenas', [QuincenaController::class, 'verQuincenas'])->name('quincenas.ver');
Route::get('/recibo/{empleadoId}', [QuincenaController::class, 'generarPDF'])->name('recibo.pdf');
Route::get('/empleado/{empleadoId}/quincena/{quincenaId}/{tipo}/generar-pdf', 
    [QuincenaController::class, 'generarPDF'])
    ->name('empleado.generar-pdf');
    Route::get('/empleados/{empleadoId}/quincena/{quincenaId}/generar-pdf/primera', 
    [QuincenaController::class, 'primeragenerarPDF']
)->name('empleado.generar-pdf.primera');
});

Route::get('download-manual', [Manualcontroller::class, 'downloadManual'])->name('download.manual');


// Cargar rutas de autenticación
require __DIR__.'/auth.php';
