<?php

if (app()->environment() === 'production'){
    Route::get('/{any}', function () {
        return view('app');
    })->where('any', '.*');
} else {
    Route::get('/{any}', function () {
        return view('app-dev');
    })->where('any', '.*');
}


