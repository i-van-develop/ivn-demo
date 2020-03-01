<?php

if (app()->environment() === 'production'){
    Route::get('/', function () {
        return view('app');
    });
} else {
    Route::get('/', function () {
        return view('app-dev');
    });
}
