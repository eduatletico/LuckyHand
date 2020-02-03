<?php

namespace App\Http\Controllers;

use App\User as UserModel;

class UserController extends Controller
{
  public function getUserByName($name)
  {
    return UserModel::where('name', '=', $name)->first();
  }
}
