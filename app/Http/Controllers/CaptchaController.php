<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CaptchaController extends Controller
{
    public function image(Request $request)
    {
        $width = 180;
        $height = 60;
        $length = 5;
        $chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        $text = '';
        for ($i = 0; $i < $length; $i++) {
            $text .= $chars[random_int(0, strlen($chars) - 1)];
        }

        session(['captcha_value' => strtolower($text)]);

        $img = imagecreatetruecolor($width, $height);
        $bg = imagecolorallocate($img, 220, 220, 220);
        $color = imagecolorallocate($img, 0, 0, 0);
        imagefilledrectangle($img, 0, 0, $width, $height, $bg);

        // Dibujar texto simple
        imagestring($img, 5, 30, 20, $text, $color);

        // Ruido simple
        for ($i = 0; $i < 100; $i++) {
            imagesetpixel($img, random_int(0, $width), random_int(0, $height), $color);
        }

        ob_start();
        imagepng($img);
        $imageData = ob_get_clean();
        imagedestroy($img);

        return response($imageData, 200)->header('Content-Type', 'image/png');
    }
}
