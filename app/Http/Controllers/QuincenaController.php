<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use App\Models\Hijo;
use App\Models\Profesionalizacion;
use App\Models\PrimerQuincena;
use App\Models\SegundaQuincena;
use App\Models\VariablePago;
use App\Models\ExtraSueldo;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Dompdf\Dompdf;
use Dompdf\Options;

class QuincenaController extends Controller
{
    public function index()
    {
        $empleados = Empleado::all();
        return inertia('Quincena/RegistrarQuincena', compact('empleados'));
    }

public function registrar(Request $request)
{
    $validated = $request->validate([
        'empleado_id'            => 'required|exists:empleados,id',
        'tipo_quincena'          => 'required|in:primer,segunda',
        'fecha_pago'             => 'required|date',
        'tiene_horas_extras'     => 'sometimes|boolean',
        'horas_extras'           => 'nullable|integer|min:0',
        'aplicar_bono_nocturno'  => 'sometimes|boolean',
        'tiene_dias_feriados'    => 'sometimes|boolean',
        'dias_feriados'          => 'nullable|integer|min:0|max:15',
    ]);

    $empleadoId   = $validated['empleado_id'];
    $fechaPago    = Carbon::parse($validated['fecha_pago']);
    $tipoQuincena = $validated['tipo_quincena'];

    // Validar si ya existe la quincena para el mismo mes
    $yaRegistrada = $tipoQuincena === 'primer'
        ? PrimerQuincena::where('empleado_id', $empleadoId)
            ->whereMonth('fecha_pago', $fechaPago->month)
            ->exists()
        : SegundaQuincena::where('empleado_id', $empleadoId)
            ->whereMonth('fecha_pago', $fechaPago->month)
            ->exists();

    if ($yaRegistrada) {
        return back()->withErrors(['error' => 'Esta quincena ya fue registrada para este mes.']);
    }

    $variables = VariablePago::orderBy('id')->first();
    $empleado  = Empleado::find($empleadoId);

    $extraSueldo = ExtraSueldo::where('empleado_id', $empleadoId)->first();
    $sueldoQuincenal = $extraSueldo
        ? $extraSueldo->sueldo_quincenal
        : $variables->sueldo_basico_quincenal;

    $primaHijos = Hijo::where('empleado_id', $empleado->id)->value('cantidad') * $variables->prima_hijos;

    $profesionalizacion = Profesionalizacion::where('empleado_id', $empleado->id)->first();
    if ($profesionalizacion) {
        switch ($profesionalizacion->tiene_profesionalizacion) {
            case 1: $primaProfesionalizacion = $sueldoQuincenal * 0.20; break;
            case 2: $primaProfesionalizacion = $sueldoQuincenal * 0.25; break;
            case 3: $primaProfesionalizacion = $sueldoQuincenal * 0.30; break;
            case 4: $primaProfesionalizacion = $sueldoQuincenal * 0.35; break;
            case 5: $primaProfesionalizacion = $sueldoQuincenal * 0.40; break;
            default: $primaProfesionalizacion = 0; break;
        }
    } else {
        $primaProfesionalizacion = 0;
    }

    $añosAntiguedad = Carbon::parse($empleado->fecha_ingreso)->diffInYears(Carbon::now());
    $porcentajesAntiguedad = [
        1 => 0.01, 2 => 0.02, 3 => 0.03, 4 => 0.04, 5 => 0.05,
        6 => 0.062, 7 => 0.074, 8 => 0.086, 9 => 0.098, 10 => 0.11,
        11 => 0.124, 12 => 0.138, 13 => 0.152, 14 => 0.166, 15 => 0.18,
        16 => 0.196, 17 => 0.212, 18 => 0.228, 19 => 0.244, 20 => 0.26,
        21 => 0.278, 22 => 0.296, 23 => 0.30
    ];
    $primaAntiguedad = isset($porcentajesAntiguedad[$añosAntiguedad])
        ? $sueldoQuincenal * $porcentajesAntiguedad[$añosAntiguedad]
        : ($añosAntiguedad >= 23 ? $sueldoQuincenal * 0.30 : 0);

    $cantidadHorasExtras = $validated['tiene_horas_extras'] ? (int) $validated['horas_extras'] : 0;
    $pagoHorasExtra = 0;
    if ($cantidadHorasExtras > 0) {
        $valorHoraExtra = ($sueldoQuincenal / 15) / 8 * 1.50;
        $pagoHorasExtra = $valorHoraExtra * $cantidadHorasExtras;
    }

    $aplicarBonoNocturno = isset($validated['aplicar_bono_nocturno']) && $validated['aplicar_bono_nocturno'];
    $bonoNocturno = $aplicarBonoNocturno
        ? ($sueldoQuincenal + $primaProfesionalizacion + $primaHijos + $primaAntiguedad) * 0.30
        : 0;

    $cantidadDiasFeriados = isset($validated['tiene_dias_feriados']) && $validated['tiene_dias_feriados']
        ? (int) $validated['dias_feriados']
        : 0;

    $pagoDiasFeriados = 0;
    if ($cantidadDiasFeriados > 0) {
        $valorDiario = $sueldoQuincenal / 15;
        $pagoDiasFeriados = $valorDiario * 1.5 * $cantidadDiasFeriados;
    }

    // Datos a guardar
    $data = [
        'empleado_id'                => $empleado->id,
        'sueldo_basico_quincenal'    => $sueldoQuincenal,
        'prima_profesionalizacion'   => $primaProfesionalizacion,
        'prima_hijos'                => $primaHijos,
        'prima_antiguedad'           => $primaAntiguedad,
        'seguro_social_obligatorio'  => $variables->seguro_social_obligatorio,
        'regimen_prestaciones_empleo'=> $variables->regimen_prestaciones_empleo,
        'ley_vivienda_habitat'       => $variables->ley_vivienda_habitat,
        'tesoreria_seguridad_social' => $variables->tesoreria_seguridad_social,
        'caja_ahorro'                => $variables->caja_ahorro,
        'fecha_pago'                 => $validated['fecha_pago'],
        'horas_extra'                => $pagoHorasExtra,
        'bono_nocturno'              => $bonoNocturno,
        'dias_feriados'              => $pagoDiasFeriados,
        'cantidad_dias_feriados'     => $cantidadDiasFeriados, // <- Se guarda el número exacto
    ];

    if ($tipoQuincena === 'segunda') {
        $data['cestaticket'] = $variables->cestaticket;
        SegundaQuincena::create($data);
    } else {
        PrimerQuincena::create($data);
    }

    return back()->with('success', 'Quincena registrada correctamente.');
}

    
    
    
    

    public function listarEmpleados()
    {
        $empleados = Empleado::select('id', 'nombre', 'apellido', 'cedula')->get();
        return inertia('Quincena/ListarEmpleados', [
            'empleados' => $empleados,
        ]);
    }

    public function verQuincenas($empleadoId)
    {
        $empleado = Empleado::findOrFail($empleadoId);
    
        $primeraQuincena = PrimerQuincena::where('empleado_id', $empleadoId)
            ->orderBy('fecha_pago', 'asc')
            ->get();
    
        $segundaQuincena = SegundaQuincena::where('empleado_id', $empleadoId)
            ->orderBy('fecha_pago', 'asc')
            ->get();
    
        // Obtener todos los meses únicos para asegurar que no falte ninguno
        $mesesUnicos = $primeraQuincena->pluck('fecha_pago')
            ->merge($segundaQuincena->pluck('fecha_pago'))
            ->map(fn($fecha) => (new \DateTime($fecha))->format('F Y'))
            ->unique();
    
        $quincenas = collect();
    
        foreach ($mesesUnicos as $mes) {
            $primera = $primeraQuincena->first(fn($q) => (new \DateTime($q->fecha_pago))->format('F Y') === $mes);
            $segunda = $segundaQuincena->first(fn($q) => (new \DateTime($q->fecha_pago))->format('F Y') === $mes);
    
            $quincenas->push([
                'mes' => $mes,
                'primera' => $primera,
                'segunda' => $segunda,
            ]);
        }
    
        return inertia('Quincena/VerQuincenas', [
            'empleado' => $empleado,
            'quincenas' => $quincenas,
        ]);
    }
    
    public function generarPDF($empleadoId, $quincenaId, $tipo)
    {
        Carbon::setLocale('es');
        // Obtener el empleado
        $empleado = Empleado::findOrFail($empleadoId);
    
        // Obtener la quincena solicitada
        $quincenaSeleccionada = $tipo === 'primera'
            ? PrimerQuincena::findOrFail($quincenaId)
            : SegundaQuincena::findOrFail($quincenaId);
    
        // Buscar la otra quincena del mismo mes
        if ($tipo === 'primera') {
            $segundaQuincena = SegundaQuincena::where('empleado_id', $empleadoId)
                ->whereYear('fecha_pago', $quincenaSeleccionada->fecha_pago->year)
                ->whereMonth('fecha_pago', $quincenaSeleccionada->fecha_pago->month)
                ->first();
            $primerQuincena = $quincenaSeleccionada;
        } else {
            $primerQuincena = PrimerQuincena::where('empleado_id', $empleadoId)
                ->whereYear('fecha_pago', $quincenaSeleccionada->fecha_pago->year)
                ->whereMonth('fecha_pago', $quincenaSeleccionada->fecha_pago->month)
                ->first();
            $segundaQuincena = $quincenaSeleccionada;
        }
    
        if (!$primerQuincena || !$segundaQuincena) {
            return back()->with('error', 'No se encontraron ambas quincenas para el mes seleccionado.');
        }
    
        // Configuración de DomPDF
        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isPhpEnabled', true);
        $options->set('isRemoteEnabled', true); // Permite cargar recursos remotos
        $options->set('chroot', public_path()); // Establece el directorio raíz para recursos locales
    
        $dompdf = new Dompdf($options);
    
        // Configurar contexto HTTP para SSL
        $contxt = stream_context_create([
            'ssl' => [
                'verify_peer'      => false,
                'verify_peer_name' => false,
                'allow_self_signed'=> true,
            ]
        ]);
        $dompdf->setHttpContext($contxt);
    
        // Renderizar la vista
        $html = view('pdfs.quincena', [
            'empleado'        => $empleado,
            'primerQuincena'  => $primerQuincena,
            'segundaQuincena' => $segundaQuincena,
            'mesAno'          => $quincenaSeleccionada->fecha_pago->translatedFormat('F Y'),
            'fechaInicio'     => $quincenaSeleccionada->fecha_pago->startOfMonth()->format('d/m/Y'),
            'fechaFin'        => $quincenaSeleccionada->fecha_pago->endOfMonth()->format('d/m/Y'),
        ])->render();
    
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'landscape');
        $dompdf->render();
    
        return $dompdf->stream("recibo-quincena-{$empleado->cedula}-{$tipo}.pdf");
    }
    
    

    public function primeragenerarPDF($empleadoId, $quincenaId)
    {
        Carbon::setLocale('es');
    
        // Obtener el empleado
        $empleado = Empleado::findOrFail($empleadoId);
    
        // Obtener la primera quincena
        $primerQuincena = PrimerQuincena::findOrFail($quincenaId);
    
        if (!$primerQuincena) {
            return back()->with('error', 'No se encontró la primera quincena.');
        }
    
        // Configurar DomPDF
        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isPhpEnabled', true);
        $options->set('isRemoteEnabled', true);
        $dompdf = new Dompdf($options);
    
        // Generar el HTML
        $html = view('pdfs.primera_quincena', [
            'empleado' => $empleado,
            'primerQuincena' => $primerQuincena,
            'mesAno' => $primerQuincena->fecha_pago->translatedFormat('F Y'), // Mes en español
            'fechaInicio' => $primerQuincena->fecha_pago->startOfMonth()->format('d/m/Y'),
            'fechaFin' => $primerQuincena->fecha_pago->endOfMonth()->format('d/m/Y'),
        ])->render();
    
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'landscape');
        $dompdf->render();
    
        // Descargar el archivo PDF
        return $dompdf->stream("recibo_primera_quincena_{$empleado->id}.pdf");
    }
    
    public function destroy($tipo, $id)
{
    if ($tipo === 'primera') {
        $quincena = PrimerQuincena::findOrFail($id);
    } else {
        $quincena = SegundaQuincena::findOrFail($id);
    }

    $quincena->delete();

    return back()->with('success', "Quincena {$tipo} eliminada correctamente.");
}
  
}
