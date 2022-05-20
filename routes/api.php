<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('/findTrackingData', 'Api\HomeController@findTrackingData');

