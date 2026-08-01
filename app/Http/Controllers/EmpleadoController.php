<?php
namespace App\Http\Controllers;

use App\Models\Empleado;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Hijo;
use App\Models\Profesionalizacion;
use App\Models\ExtraSueldo;
class EmpleadoController extends Controller
{
    public function index()
    {
        $empleados = Empleado::select('empleados.*')
            ->leftJoin('hijos', 'empleados.id', '=', 'hijos.empleado_id')
            ->leftJoin('profesionalizacion', 'empleados.id', '=', 'profesionalizacion.empleado_id')
            ->selectRaw('COALESCE(hijos.cantidad, 0) as numero_hijos')
            ->selectRaw('COALESCE(profesionalizacion.tiene_profesionalizacion, 0) as tiene_profesionalizacion')
            ->get();
    
        return Inertia::render('Empleados/EmpleadosShow', [
            'empleados' => $empleados,
        ]);
    }

    public function create()
    {
        return Inertia::render('Empleados/EmpleadosCreate');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'cedula' => 'required|string|max:20|unique:empleados',
            'centro_pago' => 'required|string|max:255',
            'fecha_ingreso' => 'required|date',
            'tipo_personal' => 'required|string|max:255',
            'cargo' => 'required|string|max:255',
            'numero_hijos' => 'nullable|integer|min:0',
            'tiene_profesionalizacion' => 'required|integer|min:0|max:5',
            'gana_mas_sueldo_basico' => 'required|boolean',
            'sueldo_quincenal' => 'nullable|numeric|min:0',
        ]);
    
        // Crear empleado
        $empleado = Empleado::create($request->only([
            'nombre',
            'apellido',
            'cedula',
            'centro_pago',
            'fecha_ingreso',
            'tipo_personal',
            'cargo',
        ]));
    
        // Registrar hijos si aplica
        if ($request->numero_hijos > 0) {
            Hijo::create([
                'empleado_id' => $empleado->id,
                'cantidad' => $request->numero_hijos,
                'variable_pago_id' => 14,
            ]);
        }
    
        // Registrar profesionalización
        Profesionalizacion::create([
            'empleado_id' => $empleado->id,
            'tiene_profesionalizacion' => $request->tiene_profesionalizacion,
            'variable_pago_id' => 11,
        ]);
    
        // Registrar extra sueldo si aplica
        if ($request->gana_mas_sueldo_basico && $request->sueldo_quincenal > 0) {
            ExtraSueldo::create([
                'empleado_id' => $empleado->id,
                'sueldo_quincenal' => $request->sueldo_quincenal,
            ]);
        }
    
        return redirect()->route('empleados.index')
            ->with('success', 'Empleado creado exitosamente.');
    }
    

    public function edit($id)
    {
        $empleado = Empleado::findOrFail($id);
        
        $hijo = Hijo::where('empleado_id', $id)->first();
        $profesionalizacion = Profesionalizacion::where('empleado_id', $id)->first();
        $extraSueldo = ExtraSueldo::where('empleado_id', $id)->first();

        return Inertia::render('Empleados/EmpleadosEdit', [
            'empleado' => $empleado,
            'numeroHijos' => $hijo ? $hijo->cantidad : 0,
            'tieneProfesionalizacion' => $profesionalizacion ? $profesionalizacion->tiene_profesionalizacion : 0,
            'extraSueldo' => $extraSueldo ? $extraSueldo->sueldo_quincenal : 0,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'cedula' => 'required|string|max:20|unique:empleados,cedula,' . $id,
            'centro_pago' => 'required|string|max:255',
            'fecha_ingreso' => 'required|date',
            'tipo_personal' => 'required|string|max:255',
            'cargo' => 'required|string|max:255',
            'numero_hijos' => 'nullable|integer|min:0',
            'tiene_profesionalizacion' => 'required|integer|min:0|max:5',
            'extra_sueldo' => 'nullable|numeric|min:0',
        ]);
    
        $empleado = Empleado::findOrFail($id);
    
        // Actualizamos los datos básicos del empleado
        $empleado->update($request->except(['numero_hijos', 'tiene_profesionalizacion', 'extra_sueldo']));
    
        // Actualizamos o creamos el registro de hijos
        if ($request->numero_hijos > 0) {
            Hijo::updateOrCreate(
                ['empleado_id' => $empleado->id],
                ['cantidad' => $request->numero_hijos]
            );
        } else {
            Hijo::where('empleado_id', $empleado->id)->delete();
        }
    
        // Actualizamos o creamos el registro de profesionalización
        Profesionalizacion::updateOrCreate(
            ['empleado_id' => $empleado->id],
            [
                'tiene_profesionalizacion' => (int)$request->tiene_profesionalizacion,
                'variable_pago_id' => 11 // Ajusta este valor según corresponda
            ]
        );
    
        // Actualizamos o creamos el registro de extra sueldo
        if ($request->extra_sueldo && $request->extra_sueldo > 0) {
            ExtraSueldo::updateOrCreate(
                ['empleado_id' => $empleado->id],
                ['sueldo_quincenal' => $request->extra_sueldo]
            );
        } else {
            ExtraSueldo::where('empleado_id', $empleado->id)->delete();
        }
    
        return redirect()->route('empleados.index')
            ->with('success', 'Empleado actualizado exitosamente.');
    }
    
    

public function destroy($id)
{
    // Busca el empleado por ID
    $empleado = Empleado::findOrFail($id);

    // Elimina el empleado
    $empleado->delete();

    // Redirige a la lista de empleados con un mensaje de éxito
    return redirect()->route('empleados.index')->with('success', 'Empleado eliminado correctamente.');
}



}
