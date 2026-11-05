<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

function getMcpVin(string $vin)
{
    $response = Http::get(
        "https://mcp.vin/api/vin/$vin"
    );
    return $response;
}

class VinController extends Controller
{
    function check(Request $request) 
    {
        $request->merge([
            'vin' => $request->input('vin', NULL)
        ]);

        // проверяем в базе дынных
        getMcpVin($request["vin"]);

        if ($request["vin"]){
            return response()->json([
            'success' => true,
            "message" => 'vin checked',
            'vin' => $request["vin"]
        ]);
        }
        return response()->json([
            "success" => false,
            "message" => "vin is empty",
            "vin" => "EMPTY"
        ]);
    }
    
}


