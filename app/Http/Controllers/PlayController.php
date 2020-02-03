<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Result as ResultModel;
use App\User as UserModel;
use App\Http\Controllers\UserController;
use App\Rules\Hand;
use App\Services\HandService;

class PlayController extends Controller
{

  private $handService;

  public function __construct(HandService $handService)
  {
    $this->handService = $handService;
  }

  public function startPlay(Request $request)
  {
    $request->validate([
      'user_name' => 'required',
      'user_hand' => ['required', new Hand]
    ]);

    $userHand = explode(" ", $request->user_hand);
    $genHand = $this->handService->generateHand(count($userHand));

    $scores = $this->handService->getScores($userHand, $genHand);

    $userController = new UserController();
    $user = $userController->getUserByName($request->user_name);
    if (!$user) {
      $user = new UserModel();
      $user->name = $request->user_name;
      $user->save();
    }

    $result = new ResultModel();
    $result->user_id = $user->id;
    $result->user_score = $scores['user_score'];
    $result->gen_hand_score = $scores['gen_hand_score'];
    $result->winner = $scores['user_score'] > $scores['gen_hand_score'] ? 1 : 0;
    $result->save();

    return response()->json(
      [
        'textResult' => $result->winner !== 0 ? 'You won!' : "You Lost :(",
        'userHand' => implode(' ', $userHand),
        'genHand' => implode(' ', $genHand),
        'scores' => $scores
      ],
      200
    );
  }
}
