<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recibo de Pago Quincenal</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .table-container {
            width: 1000px;
            border-collapse: collapse;
            border: 1px solid #000;
            background-color: #fff;
        }
        .table-container table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
        }
        .table-container th, .table-container td {
            border: 1px solid #000;
            padding: 5px;
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
    </style>
</head>
<body>

<div class="table-container">
    <table>
        <!-- Main Header -->
        <tr>
            <th colspan="6" class="header">RECIBO DE PAGO QUINCENAL DEL MES DE ENERO AÑO 2024</th>
        </tr>
        <tr>
            <th colspan="6" class="header">Desde 01/01/2024 Hasta 31/01/2024</th>
        </tr>

        <!-- Personal Information Row -->
        <tr>
            <td class="section-header" colspan="2">NOMBRES Y APELLIDOS</td>
            <td class="section-header">CÉDULA:</td>
            <td class="section-header">CENTRO DE PAGO:</td>
            <td class="section-header">FECHA DE INGRESO</td>
            <td class="section-header">TIPO DE PERSONAL:</td>
        </tr>
        <tr>
            <td colspan="2">Nombre Nombre, Apellido Apellido</td>
            <td>V-1234567</td>
            <td>BANCO DE VENEZUELA</td>
            <td>00/00/0000</td>
            <td>Empleados Contratados</td>
        </tr>
        <tr>
            <td class="section-header" colspan="3">CARGO:</td>
            <td colspan="3">Asistente</td>
        </tr>
        
        <!-- Month and Salary Information -->
        <tr>
            <th colspan="6" class="header">ENERO</th>
        </tr>
        <tr>
            <td colspan="6">Sueldo Básico Mensual : 166,00</td>
        </tr>

        <!-- First and Second Quincena Header -->
        <tr>
            <th colspan="3" class="section-header">PRIMERA QUINCENA</th>
            <th colspan="3" class="section-header">SEGUNDA QUINCENA</th>
        </tr>

        <!-- Concept and Amounts Header -->
        <tr>
            <th class="concept-name">NOMBRE DE CONCEPTOS</th>
            <th>Asignaciones</th>
            <th>Deducciones</th>
            <th class="concept-name">NOMBRE DE CONCEPTOS</th>
            <th>Asignaciones</th>
            <th>Deducciones</th>
        </tr>

        <!-- Data Rows for First and Second Quincena -->
        <tr>
            <td class="concept-name">SUELDO BÁSICO QUINCENAL</td>
            <td>83.00</td>
            <td></td>
            <td class="concept-name">SUELDO BÁSICO QUINCENAL</td>
            <td>83.00</td>
            <td></td>
        </tr>
        <tr>
            <td class="concept-name">PRIMA POR PROFESIONALIZACIÓN</td>
            <td>0.00</td>
            <td></td>
            <td class="concept-name">PRIMA POR PROFESIONALIZACIÓN</td>
            <td>0.00</td>
            <td></td>
        </tr>
        <tr>
            <td class="concept-name">PRIMA POR HIJOS</td>
            <td>0.00</td>
            <td></td>
            <td class="concept-name">PRIMA POR HIJOS</td>
            <td>0.00</td>
            <td></td>
        </tr>
        <tr>
            <td class="concept-name">PRIMA POR ANTIGÜEDAD</td>
            <td>0.83</td>
            <td></td>
            <td class="concept-name">PRIMA POR ANTIGÜEDAD</td>
            <td>0.83</td>
            <td></td>
        </tr>
        <tr>
            <td class="concept-name"></td>
            <td></td>
            <td></td>
            <td class="concept-name">CESTATICKET</td>
            <td>0.83</td>
            <td></td>
        </tr>
        <tr>
            <td class="concept-name">SEGURO SOCIAL OBLIGATORIO</td>
            <td></td>
            <td>3.83</td>
            <td class="concept-name">SEGURO SOCIAL OBLIGATORIO</td>
            <td></td>
            <td>3.83</td>
        </tr>
        <tr>
            <td class="concept-name">RÉGIMEN DE PRESTACIONES DE EMPLEO</td>
            <td></td>
            <td>0.48</td>
            <td class="concept-name">RÉGIMEN DE PRESTACIONES DE EMPLEO</td>
            <td></td>
            <td>0.48</td>
        </tr>
        <tr>
            <td class="concept-name">LEY DE VIVIENDA Y HÁBITAT (FAOV)</td>
            <td>8.30</td>
            <td>0.84</td>
            <td class="concept-name">LEY DE VIVIENDA Y HÁBITAT (FAOV)</td>
            <td></td>
            <td>0.84</td>
        </tr>
        <tr>
            <td class="concept-name">TESORERÍA DE SEGURIDAD SOCIAL</td>
            <td></td>
            <td>2.51</td>
            <td class="concept-name">TESORERÍA DE SEGURIDAD SOCIAL</td>
            <td></td>
            <td>2.51</td>
        </tr>
        <tr>
            <td class="concept-name">CAJA DE AHORRO</td>
            <td></td>
            <td></td>
            <td class="concept-name">CAJA DE AHORRO</td>
            <td>8.30</td>
            <td></td>
        </tr>

        <!-- Totals Row -->
        <tr class="totals-row">
            <td class="concept-name">TOTALES</td>
            <td>83.83</td>
            <td>15.96</td>
            <td class="concept-name">TOTALES</td>
            <td>1,524.83</td>
            <td>15.96</td>
        </tr>

        <!-- Net Row -->
        <tr class="net-row">
            <td class="concept-name" colspan="2">NETO A COBRAR BS.</td>
            <td>67.87</td>
            <td class="concept-name" colspan="2">NETO A COBRAR BS.</td>
            <td>1,508.87</td>
        </tr>

        <!-- Fecha de Pago -->
        <tr>
            <td class="concept-name" colspan="3">FECHA DE PAGO (PRIMERA QUINCENA):</td>
            <td colspan="3">00/00/0000</td>
        </tr>
        <tr>
            <td class="concept-name" colspan="3">FECHA DE PAGO (SEGUNDA QUINCENA):</td>
            <td colspan="3">00/00/0000</td>
        </tr>

        <!-- Confirmation Row -->
        <tr>
            <td colspan="6" class="net-row">Confirmo haber recibido la cantidad descrita.</td>
        </tr>
    </table>
</div>

</body>
</html>
<?php /**PATH C:\laragon\www\sgpsoto\resources\views/pdf/recibo_pago.blade.php ENDPATH**/ ?>