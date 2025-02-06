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
            height: 50px;
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
    </style>
</head>
<body>
    <div class="logo-container">
        <img src="https://www.e-bolivar.gob.ve/img/logo-dark.png" alt="Logo Gobernación" class="logo logo-left">
        <img src="https://i.ibb.co/L1Fvkpf/LOGO-NEGROFINAL-1.png" alt="Logo Museo" class="logo logo-right">
    </div>
<div class="table-container">
    <table>
        <tr>
            <th colspan="6" class="header">RECIBO DE PAGO QUINCENAL DEL MES DE <?php echo e(strtoupper($mesAno)); ?></th>
        </tr>
        <tr>
            <th colspan="6" class="header">Desde <?php echo e($fechaInicio); ?> Hasta <?php echo e($fechaFin); ?></th>
        </tr>

        <tr>
            <th class="section-header" colspan="2">NOMBRES Y APELLIDOS</th>
            <th class="section-header">CÉDULA:</th>
            <th class="section-header">CENTRO DE PAGO:</th>
            <th class="section-header">FECHA DE INGRESO</th>
            <th class="section-header">TIPO DE PERSONAL:</th>
        </tr>
        <tr>
            <td colspan="2"><?php echo e($empleado->nombre); ?> <?php echo e($empleado->apellido); ?></td>
            <td><?php echo e($empleado->cedula); ?></td>
            <td><?php echo e($empleado->centro_pago); ?></td>
            <td><?php echo e(\Carbon\Carbon::parse($empleado->fecha_ingreso)->format('d/m/Y')); ?></td>
            <td><?php echo e($empleado->tipo_personal); ?></td>
        </tr>
        <tr>
            <th class="section-header" colspan="3">CARGO:</th>
            <td colspan="3"><?php echo e($empleado->cargo); ?></td>
        </tr>

        <tr>
            <th colspan="6" class="header"><?php echo e(strtoupper($mesAno)); ?></th>
        </tr>
        <tr>
            <td colspan="6">Sueldo Básico Mensual : <?php echo e(number_format($primerQuincena->sueldo_basico_quincenal * 2, 2)); ?></td>
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

        <tr>
            <td class="concept-name">SUELDO BÁSICO QUINCENAL</td>
            <td><?php echo e(number_format($primerQuincena->sueldo_basico_quincenal, 2)); ?></td>
            <td></td>
            <td colspan="3"></td>
        </tr>
        <tr>
            <td class="concept-name">PRIMA DE PROFESIONALIZACIÓN</td>
            <td><?php echo e(number_format($primerQuincena->prima_profesionalizacion, 2)); ?></td>
            <td></td>
            <td colspan="3"></td>
        </tr>
        <tr>
            <td class="concept-name">PRIMA DE HIJOS</td>
            <td><?php echo e(number_format($primerQuincena->prima_hijos, 2)); ?></td>
            <td></td>
            <td colspan="3"></td>
        </tr>
        <tr>
            <td class="concept-name">PRIMA DE ANTIGÜEDAD</td>
            <td><?php echo e(number_format($primerQuincena->prima_antiguedad, 2)); ?></td>
            <td></td>
            <td colspan="3"></td>
        </tr>
        <tr>
            <td class="concept-name">SEGURO SOCIAL OBLIGATORIO</td>
            <td></td>
            <td><?php echo e(number_format($primerQuincena->seguro_social_obligatorio, 2)); ?></td>
            <td colspan="3"></td>
        </tr>
        <tr>
            <td class="concept-name">RÉGIMEN PRESTACIONES EMPLEO</td>
            <td></td>
            <td><?php echo e(number_format($primerQuincena->regimen_prestaciones_empleo, 2)); ?></td>
            <td colspan="3"></td>
        </tr>
        <tr>
            <td class="concept-name">LEY VIVIENDA Y HÁBITAT</td>
            <td></td>
            <td><?php echo e(number_format($primerQuincena->ley_vivienda_habitat, 2)); ?></td>
            <td colspan="3"></td>
        </tr>
        <tr>
            <td class="concept-name">TESORERÍA SEGURIDAD SOCIAL</td>
            <td></td>
            <td><?php echo e(number_format($primerQuincena->tesoreria_seguridad_social, 2)); ?></td>
            <td colspan="3"></td>
        </tr>
        <tr>
            <td class="concept-name">CAJA DE AHORRO</td>
            <td></td>
            <td><?php echo e(number_format($primerQuincena->caja_ahorro, 2)); ?></td>
            <td colspan="3"></td>
        </tr>

        <?php
           $primeraTotalAsignaciones = $primerQuincena->sueldo_basico_quincenal + 
                                 $primerQuincena->prima_profesionalizacion + 
                                 $primerQuincena->prima_hijos + 
                                 $primerQuincena->prima_antiguedad -
                                 $primerQuincena->seguro_social_obligatorio -
                                 $primerQuincena->regimen_prestaciones_empleo -
                                 $primerQuincena->ley_vivienda_habitat -
                                 $primerQuincena->tesoreria_seguridad_social -
                                 $primerQuincena->caja_ahorro;
                $primeraTotalDeducciones = $primerQuincena->seguro_social_obligatorio + $primerQuincena->regimen_prestaciones_empleo + $primerQuincena->ley_vivienda_habitat + $primerQuincena->tesoreria_seguridad_social + $primerQuincena->caja_ahorro;
        ?>

        <tr class="totals-row">
            <td>TOTAL QUINCENA</td>
            <td><?php echo e(number_format($primeraTotalAsignaciones, 2)); ?></td>
            <td><?php echo e(number_format($primeraTotalDeducciones, 2)); ?></td>
            <td colspan="3"></td>
        </tr>

        <tr class="net-row">
            <td colspan="5">TOTAL NETO</td>
            <td><?php echo e(number_format($primeraTotalAsignaciones, 2)); ?></td>
        </tr>
        <tr class="net-row">
            <td colspan="5">RECIBE CONFORME</td>
            <td></td>
        </tr>
    </table>
</div>
</body>
</html><?php /**PATH C:\laragon\www\sgpsoto\resources\views/pdfs/primera_quincena.blade.php ENDPATH**/ ?>