<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VinController extends Controller
{
    function check() 
    {
        $resp = [
            "status" => 'ok',
            "message" => "api works"
        ];
        return json_encode($resp);
    }
    
}
