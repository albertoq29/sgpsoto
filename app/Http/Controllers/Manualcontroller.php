<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Manualcontroller extends Controller
{
        public function downloadManual()
        {
            $filePath = storage_path('app/temp/manual_de_usuario.pdf');
        
            if (file_exists($filePath)) {
                return response()->download($filePath, 'manual-pdf.pdf', [
                    'Content-Type' => 'application/pdf'
                ]);
            } else {
                return abort(404, 'File not found');
            }
        }
}
