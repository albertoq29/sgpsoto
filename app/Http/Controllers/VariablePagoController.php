<?php

namespace App\Http\Controllers;

use App\Models\VariablePago;
use Illuminate\Http\Request;

class VariablePagoController extends Controller
{
    public function index()
    {
        $variables = VariablePago::all();
        return inertia('VariablesPago/Index', ['variables' => $variables]);
    }

    public function store(Request $request)
    {
        // Validación solo de los campos básicos
        $request->validate([
            'sueldo_basico_quincenal'    => 'required|numeric|min:0',
            'prima_hijos'                 => 'required|numeric|min:0',
            'cestaticket'                 => 'required|numeric|min:0',
            'seguro_social_obligatorio'   => 'required|numeric|min:0',
            'regimen_prestaciones_empleo' => 'required|numeric|min:0',
            'ley_vivienda_habitat'        => 'required|numeric|min:0',
            'tesoreria_seguridad_social'  => 'required|numeric|min:0',
            'caja_ahorro'                 => 'required|numeric|min:0',
        ]);

        // Se crean los registros únicamente con los campos básicos
        VariablePago::create($request->only([
            'sueldo_basico_quincenal',
            'prima_hijos',
            'cestaticket',
            'seguro_social_obligatorio',
            'regimen_prestaciones_empleo',
            'ley_vivienda_habitat',
            'tesoreria_seguridad_social',
            'caja_ahorro',
        ]));

        return redirect()->route('variables.index')->with('success', 'Variables creadas exitosamente.');
    }

    public function update(Request $request, $id)
    {
        $variable = VariablePago::findOrFail($id);

        $request->validate([
            'sueldo_basico_quincenal'    => 'required|numeric|min:0',
            'prima_hijos'                 => 'required|numeric|min:0',
            'cestaticket'                 => 'required|numeric|min:0',

        ]);

        // Actualiza solo los campos básicos
        $variable->update($request->only([
            'sueldo_basico_quincenal',
            'prima_hijos',
            'cestaticket',

        ]));

        return redirect()->route('variables.index')->with('success', 'Variables actualizadas exitosamente.');
    }

    public function destroy(VariablePago $variable)
    {
        $variable->delete();
        return redirect()->route('variables.index')->with('success', 'Variable eliminada con éxito.');
    }
}
