<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Recibo de Quincena</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
        .container { padding: 20px; }
        .header { text-align: center; margin-bottom: 20px; }
        .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .table th { background-color: #f4f4f4; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Recibo de Quincena</h2>
            <p>Empleado: <?php echo e($empleado->nombre); ?> <?php echo e($empleado->apellido); ?></p>
            <p>Cédula: <?php echo e($empleado->cedula); ?></p>
        </div>
        <h3>Primera Quincena</h3>
        <?php if($primeraQuincena): ?>
        <table class="table">
            <thead>
                <tr>
                    <th>Concepto</th>
                    <th>Monto</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Sueldo Básico</td><td><?php echo e($primeraQuincena->sueldo_basico_quincenal); ?></td></tr>
                <tr><td>Prima Profesionalización</td><td><?php echo e($primeraQuincena->prima_profesionalizacion); ?></td></tr>
                <tr><td>Prima Hijos</td><td><?php echo e($primeraQuincena->prima_hijos); ?></td></tr>
                <tr><td>Prima Antigüedad</td><td><?php echo e($primeraQuincena->prima_antiguedad); ?></td></tr>
                <tr><td>Seguro Social</td><td><?php echo e($primeraQuincena->seguro_social_obligatorio); ?></td></tr>
                <tr><td>Régimen Prestaciones</td><td><?php echo e($primeraQuincena->regimen_prestaciones_empleo); ?></td></tr>
                <tr><td>Ley Vivienda</td><td><?php echo e($primeraQuincena->ley_vivienda_habitat); ?></td></tr>
                <tr><td>Caja de Ahorro</td><td><?php echo e($primeraQuincena->caja_ahorro); ?></td></tr>
            </tbody>
        </table>
        <?php else: ?>
        <p>No hay datos registrados.</p>
        <?php endif; ?>

        <h3>Segunda Quincena</h3>
        <?php if($segundaQuincena): ?>
        <table class="table">
            <thead>
                <tr>
                    <th>Concepto</th>
                    <th>Monto</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Sueldo Básico</td><td><?php echo e($segundaQuincena->sueldo_basico_quincenal); ?></td></tr>
                <tr><td>Cestaticket</td><td><?php echo e($segundaQuincena->cestaticket); ?></td></tr>
                <!-- Reutilizamos campos similares -->
            </tbody>
        </table>
        <?php else: ?>
        <p>No hay datos registrados.</p>
        <?php endif; ?>
    </div>
</body>
</html>
<?php /**PATH C:\laragon\www\sgpsoto\resources\views/pdf/recibo_quincenal.blade.php ENDPATH**/ ?>