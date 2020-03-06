<?php namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function index(){
        /** @var User|null $user */
        $user = \auth()->user();
        return $user->setVisible(['id','name','login','email']);
    }
}
