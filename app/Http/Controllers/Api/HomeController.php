<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
class HomeController extends Controller
{
    public function findTrackingData(Request $request)
    {
        $records = [];
        $open = [];
        if (($open = fopen(storage_path() . "\\tracking.csv", "r")) !== FALSE) {
            $data = [];
            while (($data = fgetcsv($open, 1000, ",")) !== FALSE) {
                $records[] = $data;
            }

            fclose($open);
        }
        // dd($records);
        $tracking = [];
        $header = $records[0];
        foreach($records as  $key => $value ) {
            if($key != 0 ){
               array_push($tracking, [ $header[0] => $value[0] ,$header[1] =>  $value[1],$header[2] =>  $value[2] ] );
            }
        } 
        
        foreach($tracking as  $key => $value ) {
             if($value['code'] == $request->trackingCode){
                return response()->json([
                    'product' => $value,
                    'status'  => 'success'
                ]); 
             }
        }

        return response()->json([
            'product' => [],
            'status'  => 'error'
        ]); 
    }
}
