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
            "vin" => $request->input("vin", NULL)
        ]);

        // проверяем в базе дынных
        $resp = getMcpVin($request["vin"]);

        if ($request["vin"]){
            $res = [
            "success" => true,
            "message" => "vin checked",
            "vin" => $request["vin"],
            "make" => $resp["vehicle"]["make"],
            "model" => $resp["vehicle"]["model"],
            "trim" => $resp["vehicle"]["trim"],
            "year" => $resp["vehicle"]["year"],
            "engine_type" => $resp["engine"]["fuel_type"],
            "transmission" => $resp["transmission"]["type"],
            "drive_type" => $resp["transmission"]["drive_type"]
            ];
            if ($resp["complaints"]["available"]){
                $temp = [];
                $len = count($resp["complaints"]);
                if ($len >= 5){$len = 5;}
                for ($i = 0; $i < $len; $i++){
                    $temp[] = $resp["complaints"]["complaints"][$i];
                }
                $res["complaints"] = $temp;
            } else {
                $res["complaints"] = null;
            }
            return response()->json($res);
        }
        return response()->json([
            "success" => false,
            "message" => "vin is empty",
            "vin" => "EMPTY"
        ]);
    }
    
}


