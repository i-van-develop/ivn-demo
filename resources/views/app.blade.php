<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Laravel</title>
    <style>
        html, body {
            margin: 0;
        }
    </style>
</head>
<body>
<div id="app"></div>
    <script src="/js/app.js"></script>
</body>
</html>
