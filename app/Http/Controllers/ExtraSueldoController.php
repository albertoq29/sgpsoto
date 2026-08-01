<?php

namespace App\Http\Controllers;

use App\Models\ExtraSueldo;
use App\Models\Empleado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ExtraSueldoController extends Controller
{
    public function index()
{
    $empleados = Empleado::with('extrasueldo')->get();

    return inertia('ExtraSueldo/Index', [
        'empleados' => $empleados,
    ]);
}

public function store(Request $request)
{
    try {
        $validated = $request->validate([
            'empleado_id' => 'required|exists:empleados,id',
            'sueldo_quincenal' => 'required|numeric|min:0',
        ]);

        Log::info('Datos validados:', $validated);

        $extraSueldo = ExtraSueldo::updateOrCreate(
            ['empleado_id' => $validated['empleado_id']],
            ['sueldo_quincenal' => $validated['sueldo_quincenal']]
        );

        Log::info('Registro creado/actualizado:', $extraSueldo->toArray());

        return redirect()->route('extrasueldo.index')
               ->with('success', 'Sueldo extra guardado exitosamente.');
    } catch (\Exception $e) {
        Log::error('Error al guardar sueldo extra:', ['error' => $e->getMessage()]);
        return redirect()->back()
               ->with('error', 'Error al guardar el sueldo extra: ' . $e->getMessage());
    }
}

}