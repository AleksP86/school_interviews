<?php

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

Route::get('/',function()
{
	return view('home');
});

Route::get('/test',function(){ return view('test');});

Route::post('/login/check', 'LoginController@checklogin');
Route::post('/login/sign' , 'LoginController@checksignin');
Route::post('/login/logout' , 'LoginController@logout');

Route::post('/data/{val}','DataController@index');