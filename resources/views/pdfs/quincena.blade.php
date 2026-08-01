<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recibo de Pago Quincenal</title>
  <style>
    /* Regla para reducir márgenes exteriores al imprimir */
    @page {
      margin: 5mm; /* Ajusta este valor según lo deseado */
    }
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 5px; /* Un padding leve para evitar que el contenido pegue a los bordes */
      background-color: #f4f4f4;
      display: flex;
      justify-content: center;
    }
    .logo-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    .logo {
      height: 50px;
      width: auto;
    }
    .table-container {
      width: 100%;
      max-width: 100%;
      border-collapse: collapse;
      border: 1px solid #000;
      background-color: #fff;
      clear: both;
    }
    .table-container table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    .table-container th, .table-container td {
      border: 1px solid #000;
      padding: 4px;
      font-size: 14px;
    }
    .header {
      background-color: #0072b1;
      color: #fff;
      font-weight: bold;
      text-align: center;
    }
    .section-header {
      background-color: #0072b1;
      color: #fff;
      text-align: left;
      padding-left: 10px;
      font-weight: bold;
    }
    .totals-row, .net-row {
      font-weight: bold;
      background-color: #e6f3f7;
      text-align: right;
    }
    .net-row {
      background-color: #b2e3f7;
    }
    .concept-name {
      text-align: left;
      padding-left: 10px;
    }

    .footer {
      position: fixed;
      bottom: 5mm;
      left: 5mm;
      right: 5mm;
      text-align: center;
      font-size: 10px;
     
      padding-top: 3px;
    }
  </style>
</head>
<body>
@php
  use Carbon\Carbon;
  // Se asume que $fechaInicio viene en formato d/m/Y, ejemplo "01/05/2025"
  $fechaInicioCarbon = Carbon::createFromFormat('d/m/Y', $fechaInicio);
  $year = $fechaInicioCarbon->year;
  $month = $fechaInicioCarbon->month;
  $mondays = 0;
  $daysInMonth = cal_days_in_month(CAL_GREGORIAN, $month, $year);
  for ($d = 1; $d <= $daysInMonth; $d++) {
      $date = Carbon::create($year, $month, $d);
      if ($date->isMonday()) {
          $mondays++;
      }
  }
  // Cálculo del Seguro Social Obligatorio para cada quincena
  $seguroSocial1 = ($primerQuincena->sueldo_basico_quincenal * 12 / 52 * 4 / 100) * $mondays;
  $seguroSocial2 = ($segundaQuincena->sueldo_basico_quincenal * 12 / 52 * 4 / 100) * $mondays;
  // Cálculo del Régimen Prestaciones Empleo para cada quincena
  $regimenPrestaciones1 = ($primerQuincena->sueldo_basico_quincenal * 12 / 52 * 0.0005) * $mondays;
  $regimenPrestaciones2 = ($segundaQuincena->sueldo_basico_quincenal * 12 / 52 * 0.0005) * $mondays;
  // Cálculo de LEY VIVIENDA Y HÁBITAT
  $leyVivienda1 = (
      $primerQuincena->sueldo_basico_quincenal +
      $primerQuincena->prima_profesionalizacion +
      $primerQuincena->prima_hijos +
      $primerQuincena->prima_antiguedad 
  ) * 0.01;
  $leyVivienda2 = (
      $segundaQuincena->sueldo_basico_quincenal +
      $segundaQuincena->prima_profesionalizacion +
      $segundaQuincena->prima_hijos +
      $segundaQuincena->prima_antiguedad 
  ) * 0.01;
  // Cálculo de CAJA DE AHORRO
  $cajaAhorro1 = $primerQuincena->sueldo_basico_quincenal * 0.10;
  $cajaAhorro2 = $segundaQuincena->sueldo_basico_quincenal * 0.10;
  // Cálculo de TESORERÍA SEGURIDAD SOCIAL
  $tesoreriaSocial1 = (
      $primerQuincena->sueldo_basico_quincenal +
      $primerQuincena->prima_profesionalizacion +
      $primerQuincena->prima_antiguedad +
      $primerQuincena->prima_hijos 
  ) * 0.03;
  $tesoreriaSocial2 = (
      $segundaQuincena->sueldo_basico_quincenal +
      $segundaQuincena->prima_profesionalizacion +
      $segundaQuincena->prima_antiguedad +
      $segundaQuincena->prima_hijos 
  ) * 0.03;
  // Totales para asignaciones y deducciones (incluye horas extra, bono nocturno y días feriados)
  $primeraTotalAsignaciones = $primerQuincena->sueldo_basico_quincenal +
      $primerQuincena->prima_profesionalizacion +
      $primerQuincena->prima_hijos +
      $primerQuincena->prima_antiguedad +
      $primerQuincena->horas_extra +
      ($primerQuincena->bono_nocturno ?? 0) +
      ($primerQuincena->dias_feriados ?? 0);
  $primeraTotalDeducciones = $seguroSocial1 +
      $regimenPrestaciones1 +
      $leyVivienda1 +
      $tesoreriaSocial1 +
      $cajaAhorro1;
  $segundaTotalAsignaciones = $segundaQuincena->sueldo_basico_quincenal +
      $segundaQuincena->prima_profesionalizacion +
      $segundaQuincena->prima_hijos +
      $segundaQuincena->prima_antiguedad +
      $segundaQuincena->cestaticket +
      $segundaQuincena->horas_extra +
      ($segundaQuincena->bono_nocturno ?? 0) +
      ($segundaQuincena->dias_feriados ?? 0);
  $segundaTotalDeducciones = $seguroSocial2 +
      $regimenPrestaciones2 +
      $leyVivienda1 +
      $tesoreriaSocial2 +
      $cajaAhorro2;
@endphp

<div>
  <div class="logo-container">
      <img src="https://i.ibb.co/zV92S3Pd/1750954932361.png" alt="Logo Gobernación" class="logo logo-left">
      <img src="https://i.ibb.co/L1Fvkpf/LOGO-NEGROFINAL-1.png" alt="Logo Museo" class="logo logo-right">
  </div>

  <div class="table-container">
      <table>
          <tr>
              <th colspan="6" class="header">RECIBO DE PAGO QUINCENAL DEL MES DE {{ strtoupper($mesAno) }}</th>
          </tr>
          <tr>
              <th colspan="6" class="header">Desde {{ $fechaInicio }} Hasta {{ $fechaFin }}</th>
          </tr>
          <tr>
              <td class="section-header" colspan="2">NOMBRES Y APELLIDOS</td>
              <td class="section-header">CÉDULA:</td>
              <td class="section-header">CENTRO DE PAGO:</td>
              <td class="section-header">FECHA DE INGRESO</td>
              <td class="section-header">TIPO DE PERSONAL:</td>
          </tr>
          <tr>
              <td colspan="2">{{ $empleado->nombre }} {{ $empleado->apellido }}</td>
              <td>{{ $empleado->cedula }}</td>
              <td>{{ $empleado->centro_pago }}</td>
              <td>{{ \Carbon\Carbon::parse($empleado->fecha_ingreso)->format('d/m/Y') }}</td>
              <td>{{ $empleado->tipo_personal }}</td>
          </tr>
          <tr>
              <td class="section-header" colspan="3">CARGO:</td>
              <td colspan="3">{{ $empleado->cargo }}</td>
          </tr>
          <tr>
              <th colspan="6" class="header">{{ strtoupper($mesAno) }}</th>
          </tr>
          <tr>
              <td colspan="6">Sueldo Básico Mensual : {{ number_format($primerQuincena->sueldo_basico_quincenal + $segundaQuincena->sueldo_basico_quincenal, 2) }}</td>
          </tr>
          <tr>
              <th colspan="3" class="section-header">PRIMERA QUINCENA</th>
              <th colspan="3" class="section-header">SEGUNDA QUINCENA</th>
          </tr>
          <tr>
              <th class="concept-name">NOMBRE DE CONCEPTOS</th>
              <th>Asignaciones</th>
              <th>Deducciones</th>
              <th class="concept-name">NOMBRE DE CONCEPTOS</th>
              <th>Asignaciones</th>
              <th>Deducciones</th>
          </tr>
          <tr>
              <td class="concept-name">SUELDO BÁSICO QUINCENAL</td>
              <td>{{ number_format($primerQuincena->sueldo_basico_quincenal, 2) }}</td>
              <td></td>
              <td class="concept-name">SUELDO BÁSICO QUINCENAL</td>
              <td>{{ number_format($segundaQuincena->sueldo_basico_quincenal, 2) }}</td>
              <td></td>
          </tr>
          <tr>
              <td class="concept-name">PRIMA DE PROFESIONALIZACIÓN</td>
              <td>{{ number_format($primerQuincena->prima_profesionalizacion, 2) }}</td>
              <td></td>
              <td class="concept-name">PRIMA DE PROFESIONALIZACIÓN</td>
              <td>{{ number_format($segundaQuincena->prima_profesionalizacion, 2) }}</td>
              <td></td>
          </tr>
          <tr>
              <td class="concept-name">PRIMA DE HIJOS</td>
              <td>{{ number_format($primerQuincena->prima_hijos, 2) }}</td>
              <td></td>
              <td class="concept-name">PRIMA DE HIJOS</td>
              <td>{{ number_format($segundaQuincena->prima_hijos, 2) }}</td>
              <td></td>
          </tr>
          <tr>
              <td class="concept-name">PRIMA DE ANTIGÜEDAD</td>
              <td>{{ number_format($primerQuincena->prima_antiguedad, 2) }}</td>
              <td></td>
              <td class="concept-name">PRIMA DE ANTIGÜEDAD</td>
              <td>{{ number_format($segundaQuincena->prima_antiguedad, 2) }}</td>
              <td></td>
          </tr>
          <tr>
              <td class="concept-name">HORAS EXTRA</td>
              <td>{{ number_format($primerQuincena->horas_extra, 2) }}</td>
              <td></td>
              <td class="concept-name">HORAS EXTRA</td>
              <td>{{ number_format($segundaQuincena->horas_extra, 2) }}</td>
              <td></td>
          </tr>
          <tr>
              <td class="concept-name">BONO NOCTURNO</td>
              <td>{{ number_format($primerQuincena->bono_nocturno ?? 0, 2) }}</td>
              <td></td>
              <td class="concept-name">BONO NOCTURNO</td>
              <td>{{ number_format($segundaQuincena->bono_nocturno ?? 0, 2) }}</td>
              <td></td>
          </tr>
          <tr>
              <td class="concept-name">DIA FERIADO</td>
              <td>{{ number_format($primerQuincena->dias_feriados ?? 0, 2) }}</td>
              <td></td>
              <td class="concept-name">DIA FERIADO</td>
              <td>{{ number_format($segundaQuincena->dias_feriados ?? 0, 2) }}</td>
              <td></td>
          </tr>
          <tr>
              <td class="concept-name"></td>
              <td></td>
              <td></td>
              <td class="concept-name">CESTATICKET</td>
              <td>{{ number_format($segundaQuincena->cestaticket, 2) }}</td>
              <td></td>
          </tr>
          <tr>
              <td class="concept-name">SEGURO SOCIAL OBLIGATORIO</td>
              <td></td>
              <td>{{ number_format($seguroSocial1, 2) }}</td>
              <td class="concept-name">SEGURO SOCIAL OBLIGATORIO</td>
              <td></td>
              <td>{{ number_format($seguroSocial2, 2) }}</td>
          </tr>
          <tr>
              <td class="concept-name">RÉGIMEN PRESTACIONES EMPLEO</td>
              <td></td>
              <td>{{ number_format($regimenPrestaciones1, 2) }}</td>
              <td class="concept-name">RÉGIMEN PRESTACIONES EMPLEO</td>
              <td></td>
              <td>{{ number_format($regimenPrestaciones2, 2) }}</td>
          </tr>
          <tr>
              <td class="concept-name">LEY VIVIENDA Y HÁBITAT</td>
              <td></td>
              <td>{{ number_format($leyVivienda1, 2) }}</td>
              <td class="concept-name">LEY VIVIENDA Y HÁBITAT</td>
              <td></td>
              <td>{{ number_format($leyVivienda2, 2) }}</td>
          </tr>
          <tr>
              <td class="concept-name">TESORERÍA SEGURIDAD SOCIAL</td>
              <td></td>
              <td>{{ number_format($tesoreriaSocial1, 2) }}</td>
              <td class="concept-name">TESORERÍA SEGURIDAD SOCIAL</td>
              <td></td>
              <td>{{ number_format($tesoreriaSocial2, 2) }}</td>
          </tr>
          <tr>
              <td class="concept-name">CAJA DE AHORRO</td>
              <td></td>
              <td>{{ number_format($cajaAhorro1, 2) }}</td>
              <td class="concept-name">CAJA DE AHORRO</td>
              <td></td>
              <td>{{ number_format($cajaAhorro2, 2) }}</td>
          </tr>
          <tr class="totals-row">
              <td>TOTAL QUINCENA</td>
              <td>{{ number_format($primeraTotalAsignaciones, 2) }}</td>
              <td>{{ number_format($primeraTotalDeducciones, 2) }}</td>
              <td>TOTAL QUINCENA</td>
              <td>{{ number_format($segundaTotalAsignaciones, 2) }}</td>
              <td>{{ number_format($segundaTotalDeducciones, 2) }}</td>
          </tr>
          <tr class="net-row">
              <td colspan="5">TOTAL NETO</td>
              <td>{{ number_format(($primeraTotalAsignaciones + $segundaTotalAsignaciones) - ($primeraTotalDeducciones + $segundaTotalDeducciones), 2) }}</td>
          </tr>
          <tr class="net-row">
              <td colspan="5">RECIBE CONFORME</td>
              <td></td>
          </tr>
      </table>
  </div>
  <br>
<!-- Pie de página con la dirección -->
<div class="footer">
    Fundación museo de arte moderno "Jesus Soto"<br>
    Ubicado en la avenida Germania
  </div>
</div>
</body>
</html>