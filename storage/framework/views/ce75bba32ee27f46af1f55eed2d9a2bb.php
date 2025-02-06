<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recibo de Pago Quincenal</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            margin: 0;
            padding: 0;
        }
        .header {
            text-align: center;
            background-color: #0072b1;
            color: white;
            padding: 10px;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .table th, .table td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
        .totals {
            background-color: #f4f4f4;
            font-weight: bold;
        }
        .concepto {
            text-align: left;
        }
    </style>
</head>
<body>

    <div class="header">
        <h2>Recibo de Pago Quincenal</h2>
        <p><?php echo e(now()->format('F Y')); ?> (Desde <?php echo e($primeraQuincena->first()->inicio ?? 'N/A'); ?> hasta <?php echo e($segundaQuincena->last()->fin ?? 'N/A'); ?>)</p>
    </div>

    <table class="table">
        <tr>
            <th colspan="2">Empleado</th>
        </tr>
        <tr>
            <td>Nombre y Apellido</td>
            <td><?php echo e($empleado->nombre); ?> <?php echo e($empleado->apellido); ?></td>
        </tr>
        <tr>
            <td>Cédula</td>
            <td><?php echo e($empleado->cedula); ?></td>
        </tr>
        <tr>
            <td>Centro de Pago</td>
            <td><?php echo e($empleado->centro_pago); ?></td>
        </tr>
        <tr>
            <td>Fecha de Ingreso</td>
            <td><?php echo e($empleado->fecha_ingreso); ?></td>
        </tr>
        <tr>
            <td>Tipo de Personal</td>
            <td><?php echo e($empleado->tipo_personal); ?></td>
        </tr>
    </table>

    <table class="table">
        <tr>
            <th>Conceptos</th>
            <th>Asignaciones</th>
            <th>Deducciones</th>
        </tr>
        <?php $__currentLoopData = $primeraQuincena; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $concepto): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <tr>
            <td class="concepto"><?php echo e($concepto->nombre); ?></td>
            <td><?php echo e($concepto->asignaciones); ?></td>
            <td><?php echo e($concepto->deducciones); ?></td>
        </tr>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        <tr class="totals">
            <td>Total Primera Quincena</td>
            <td><?php echo e($totalAsignacionesPrimera); ?></td>
            <td><?php echo e($totalDeduccionesPrimera); ?></td>
        </tr>
    </table>

    <table class="table">
        <tr>
            <th>Conceptos</th>
            <th>Asignaciones</th>
            <th>Deducciones</th>
        </tr>
        <?php $__currentLoopData = $segundaQuincena; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $concepto): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <tr>
            <td class="concepto"><?php echo e($concepto->nombre); ?></td>
            <td><?php echo e($concepto->asignaciones); ?></td>
            <td><?php echo e($concepto->deducciones); ?></td>
        </tr>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        <tr class="totals">
            <td>Total Segunda Quincena</td>
            <td><?php echo e($totalAsignacionesSegunda); ?></td>
            <td><?php echo e($totalDeduccionesSegunda); ?></td>
        </tr>
    </table>

    <p><strong>Neto a Cobrar Primera Quincena:</strong> <?php echo e($netoPrimera); ?></p>
    <p><strong>Neto a Cobrar Segunda Quincena:</strong> <?php echo e($netoSegunda); ?></p>

</body>
</html>
<?php /**PATH C:\laragon\www\sgpsoto\resources\views/pdf/recibo.blade.php ENDPATH**/ ?>