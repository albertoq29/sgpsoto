<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;



class RespaldoController extends Controller
{
   

    //prueba

    public function index()
    {
        return Inertia::render('Backup/Backups');
    }
    
    public function copiadescarga()
    {
// Nombre del archivo de respaldo
$fileName = 'backup_' . date('Y_m_d_H_i_s') . '.sql';
// Ruta completa del archivo de respaldo
$filePath = storage_path('app/' . $fileName);

// Comando mysqldump
$command = sprintf(
    'C:\\laragon\\bin\\mysql\\mysql-8.0.30-winx64\\bin\\mysqldump --user=%s --password=%s --host=%s %s > %s',
    env('DB_USERNAME'),
    env('DB_PASSWORD'),
    env('DB_HOST'),
    env('DB_DATABASE'),
    $filePath
);

try {
    // Ejecutar el comando mysqldump
    $process = Process::fromShellCommandline($command);
    $process->run();

    // Verificar si el proceso fallÃ³
    if (!$process->isSuccessful()) {
        throw new ProcessFailedException($process);
    }

    // Descargar el archivo de respaldo
    return response()->download($filePath)->deleteFileAfterSend(true);
} catch (\Exception $e) {
    // Manejar errores
    return back()->with('error', 'Error al crear el respaldo: ' . $e->getMessage());
}
    }

    public function restore(Request $request)
    {
        if (!$request->hasFile('backup_file')) {
            return back()->with('error', 'No se ha seleccionado ningún archivo');
        }
    
        $file = $request->file('backup_file');
        
        // Guardar el archivo temporalmente
        $path = storage_path('app/temp/');
        if (!file_exists($path)) {
            mkdir($path, 0755, true);
        }
        
        $fileName = 'restore_' . time() . '.sql';
        $file->move($path, $fileName);
        $fullPath = $path . $fileName;
    
        // Comando para restaurar
        $command = '"C:\\laragon\\bin\\mysql\\mysql-8.0.30-winx64\\bin\\mysql" '
            . ' --user=' . env('DB_USERNAME')
            . ' --password=' . env('DB_PASSWORD')
            . ' --host=' . env('DB_HOST')
            . ' ' . env('DB_DATABASE')
            . ' < ' . $fullPath;
    
        exec($command, $output, $returnVar);
    
        // Eliminar archivo temporal
        unlink($fullPath);
    
        if ($returnVar === 0) {
            return back()->with('success', 'Base de datos restaurada correctamente');
        } else {
            return back()->with('error', 'Error al restaurar la base de datos');
        }
    }
} 