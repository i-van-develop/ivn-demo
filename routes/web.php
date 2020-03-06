<?php

use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function(){
    Route::middleware('auth')->group(function (){
        Route::get('profile','ProfileController@index');
    });
    Route::post('login','Auth\LoginController@login');
    Route::post('register','Auth\RegisterController@register');
});

if (app()->environment() === 'production'){
    Route::get('/{any}', function () {
        return view('app');
    })->where('any', '.*');
} else {
    Route::get('/{any}', function () {
        return view('app-dev');
    })->where('any', '.*');
}
