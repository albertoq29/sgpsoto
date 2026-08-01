<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recibo de Pago Quincenal</title>
  <style>
      body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f4f4f4;
      }
      .logo-container {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
      }
      .logo {
          height: 55px;
          width: auto;
      }
      .logo-left {
          float: left;
      }
      .logo-right {
          float: right;
      }
      .table-container {
          width: 100%;
          display: flex;
          justify-content: center;
      }
      table {
          width: 80%;
          margin: auto;
          border-collapse: collapse;
      }
      th, td {
          border: 1px solid #000;
          padding: 2px;
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
      td[colspan="6"] {
          text-align: center;
          font-size: 16px;
      }
      @media print {
          body {
              padding: 0;
              margin: 0;
          }
          .table-container {
              width: 100%;
          }
      }

          .footer {
      position: fixed;
      bottom: 5mm;
      left: 5mm;
      right: 5mm;
      text-align: center;
      font-size: 8px;
     
      padding-top: 8px;
    }
  </style>
</head>
<body>
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
              <th class="section-header" colspan="2">NOMBRES Y APELLIDOS</th>
              <th class="section-header">CÉDULA:</th>
              <th class="section-header">CENTRO DE PAGO:</th>
              <th class="section-header">FECHA DE INGRESO</th>
              <th class="section-header">TIPO DE PERSONAL:</th>
          </tr>
          <tr>
              <td colspan="2">{{ $empleado->nombre }} {{ $empleado->apellido }}</td>
              <td>{{ $empleado->cedula }}</td>
              <td>{{ $empleado->centro_pago }}</td>
              <td>{{ \Carbon\Carbon::parse($empleado->fecha_ingreso)->format('d/m/Y') }}</td>
              <td>{{ $empleado->tipo_personal }}</td>
          </tr>
          <tr>
              <th class="section-header" colspan="3">CARGO:</th>
              <td colspan="3">{{ $empleado->cargo }}</td>
          </tr>

          <tr>
              <th colspan="6" class="header">{{ strtoupper($mesAno) }}</th>
          </tr>
          <tr>
              <td colspan="6">Sueldo Básico Mensual : {{ number_format($primerQuincena->sueldo_basico_quincenal * 2, 2) }}</td>
          </tr>

          <tr>
              <th colspan="6" class="section-header">PRIMERA QUINCENA</th>
          </tr>

          <tr>
              <th class="concept-name">NOMBRE DE CONCEPTOS</th>
              <th>Asignaciones</th>
              <th>Deducciones</th>
              <th colspan="3"></th>
          </tr>
          
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

              // Cálculo del Seguro Social Obligatorio:
              $seguroSocialObligatorio = $primerQuincena->sueldo_basico_quincenal * (12/52) * (4/100) * $mondays;
              
              // Cálculo del Régimen de Prestaciones Empleo:
              $regimenPrestacionesEmpleo = $primerQuincena->sueldo_basico_quincenal * (12/52) * 0.0005 * $mondays;
              
              // Total de asignaciones base
              $totalAsignacionesBase = $primerQuincena->sueldo_basico_quincenal +
                                       $primerQuincena->prima_profesionalizacion +
                                       $primerQuincena->prima_hijos +
                                       $primerQuincena->prima_antiguedad;
              
              // Cálculo de Ley de Vivienda y Hábitat: 1% del total de asignaciones base
              $leyViviendaHabitat = $totalAsignacionesBase * 0.01;
              
              // Cálculo de TESORERÍA SEGURIDAD SOCIAL: 3% del total de asignaciones base
              $tesoreriaSeguridadSocial = $totalAsignacionesBase * 0.03;
              
              // Cálculo de CAJA DE AHORRO: 10% del sueldo básico quincenal
              $cajaAhorro = $primerQuincena->sueldo_basico_quincenal * 0.10;
          @endphp

          <tr>
              <td class="concept-name">SUELDO BÁSICO QUINCENAL</td>
              <td>{{ number_format($primerQuincena->sueldo_basico_quincenal, 2) }}</td>
              <td></td>
              <td colspan="3"></td>
          </tr>
          <tr>
              <td class="concept-name">PRIMA DE PROFESIONALIZACIÓN</td>
              <td>{{ number_format($primerQuincena->prima_profesionalizacion, 2) }}</td>
              <td></td>
              <td colspan="3"></td>
          </tr>
          <tr>
              <td class="concept-name">PRIMA DE HIJOS</td>
              <td>{{ number_format($primerQuincena->prima_hijos, 2) }}</td>
              <td></td>
              <td colspan="3"></td>
          </tr>
          <tr>
              <td class="concept-name">PRIMA DE ANTIGÜEDAD</td>
              <td>{{ number_format($primerQuincena->prima_antiguedad, 2) }}</td>
              <td></td>
              <td colspan="3"></td>
          </tr>
          <!-- Nueva fila para Horas Extra -->
          <tr>
              <td class="concept-name">HORAS EXTRA</td>
              <td>{{ number_format($primerQuincena->horas_extra, 2) }}</td>
              <td></td>
              <td colspan="3"></td>
          </tr>
          <!-- Nueva fila para Bono Nocturno -->
          <tr>
              <td class="concept-name">BONO NOCTURNO</td>
              <td>{{ number_format($primerQuincena->bono_nocturno ?? 0, 2) }}</td>
              <td></td>
              <td colspan="3"></td>
          </tr>
          <tr>
              <td class="concept-name">DIA FERIADO</td>
              <td>{{ number_format($primerQuincena->dias_feriados ?? 0, 2) }}</td>
              <td></td>
            <td colspan="3"></td>
          </tr>

          <tr>
              <td class="concept-name">SEGURO SOCIAL OBLIGATORIO</td>
              <td></td>
              <td>{{ number_format($seguroSocialObligatorio, 2) }}</td>
              <td colspan="3"></td>
          </tr>
          <tr>
              <td class="concept-name">RÉGIMEN PRESTACIONES EMPLEO</td>
              <td></td>
              <td>{{ number_format($regimenPrestacionesEmpleo, 2) }}</td>
              <td colspan="3"></td>
          </tr>
          <tr>
              <td class="concept-name">LEY VIVIENDA Y HÁBITAT</td>
              <td></td>
              <td>{{ number_format($leyViviendaHabitat, 2) }}</td>
              <td colspan="3"></td>
          </tr>
          <tr>
              <td class="concept-name">TESORERÍA SEGURIDAD SOCIAL</td>
              <td></td>
              <td>{{ number_format($tesoreriaSeguridadSocial, 2) }}</td>
              <td colspan="3"></td>
          </tr>
          <tr>
              <td class="concept-name">CAJA DE AHORRO</td>
              <td></td>
              <td>{{ number_format($cajaAhorro, 2) }}</td>
              <td colspan="3"></td>
          </tr>

          @php
              // Sumar las asignaciones, incluyendo horas extra y bono nocturno (si no existe se suma 0)
              $primeraTotalAsignaciones = $primerQuincena->sueldo_basico_quincenal +
                                           $primerQuincena->prima_profesionalizacion +
                                           $primerQuincena->prima_hijos +
                                           $primerQuincena->prima_antiguedad +
                                           $primerQuincena->horas_extra +
                                           ($primerQuincena->bono_nocturno ?? 0)+ ($primerQuincena->dias_feriados ?? 0);;
              $primeraTotalDeducciones = $seguroSocialObligatorio +
                                         $regimenPrestacionesEmpleo +
                                         $leyViviendaHabitat +
                                         $tesoreriaSeguridadSocial +
                                         $cajaAhorro;
          @endphp

          <tr class="totals-row">
              <td>TOTAL QUINCENA</td>
              <td>{{ number_format($primeraTotalAsignaciones, 2) }}</td>
              <td>{{ number_format($primeraTotalDeducciones, 2) }}</td>
              <td colspan="3"></td>
          </tr>

          <tr class="net-row">
              <td colspan="5">TOTAL NETO</td>
              <td>{{ number_format($primeraTotalAsignaciones - $primeraTotalDeducciones, 2) }}</td>
          </tr>
          <tr class="net-row">
              <td colspan="5">RECIBE CONFORME</td>
              <td></td>
          </tr>
      </table>
  </div>
  <br>
  <br>
    <br>
  <br>
  <!-- Pie de página con la dirección -->
<div class="footer">
    Fundación museo de arte moderno "Jesus Soto"<br>
    Ubicado en la avenida Germania
  </div>
</body>
</html>
