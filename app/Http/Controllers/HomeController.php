<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Result as ResultModel;

class HomeController extends Controller
{

  public function loadLeaderboard(Request $request)
  {
    return ResultModel::join('users', 'users.id', 'results.user_id')
            ->select(['users.name'])
            ->selectRaw('count(results.user_id) AS plays')
            ->selectRaw('SUM(results.winner) AS wins')
            ->groupBy('users.name')
            ->orderBy('wins', 'desc')
            ->orderBy('plays', 'desc')
            ->get();
  }
}
