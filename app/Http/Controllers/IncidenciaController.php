<?php

// app/Http/Controllers/IncidenciaController.php

namespace App\Http\Controllers;

use App\Models\Incidencia;
use App\Models\Empleado;
use Illuminate\Http\Request;

class IncidenciaController extends Controller
{
    public function index()
    {
        $incidencias = Incidencia::with('empleado')->get();
        return inertia('Incidencias/Index', compact('incidencias'));
    }

    public function create()
    {
        $empleados = Empleado::select('id', 'nombre', 'apellido')->get();
        return inertia('Incidencias/Create', compact('empleados'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'empleado_id' => 'required|exists:empleados,id',
        ]);

        Incidencia::create([
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            'empleado_id' => $request->empleado_id,
            'fecha' => now(),
        ]);

        return redirect()->route('incidencias.index')->with('success', 'Incidencia reportada con éxito.');
    }

        public function show($id)
        {
            $incidencia = Incidencia::with('empleado')->findOrFail($id);
            return inertia('Incidencias/Show', compact('incidencia'));
        }

            public function destroy($id)
    {
        $inc = Incidencia::findOrFail($id);
        $inc->delete();

        // Para peticiones Inertia DELETE, devolvemos un redirect con flash:
        return redirect()->route('incidencias.index')
                         ->with('success', 'Incidencia eliminada correctamente.');
    }
}
