<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/clearapp', function () {
    Artisan::call('config:clear');
    Artisan::call('cache:clear');
    Artisan::call('view:clear');
    Session::flush();
    return redirect('/');
});


Route::group(['middleware' => ['guest', 'web']], function () {
    //react route
    Route::get('/', 'HomeController@index')->name('Tracking');

});


Route::group(['middleware' => ['auth']], function () {
    Route::get('/home', 'HomeController@index')->name('Dashboard');

});

Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index');