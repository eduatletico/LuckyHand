<?php

namespace App\Services;

class HandService
{
  const AVAILABLE_CARDS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

  public function generateHand($number_of_cards)
  {
    $generatedCards = [];
    $av_cards = collect(self::AVAILABLE_CARDS);

    for ($x = 0; $x < $number_of_cards; $x++) {
      $generatedCards[] = $av_cards->random();
    }

    return $generatedCards;
  }

  public function getScores($user_hand, $gen_hand)
  {
    $user_score = 0;
    $gen_hand_score = 0;

    $av_cards = self::AVAILABLE_CARDS;

    foreach ($user_hand as $key => $user_val) {
      if (array_search($user_val, $av_cards) > array_search($gen_hand[$key], $av_cards)) { // USER WIN
        $user_score++;
      } else if (array_search($user_val, $av_cards) < array_search($gen_hand[$key], $av_cards)) { // GENERATED HAND WIN
        $gen_hand_score++;
      }
    }

    return [
      'user_score' => $user_score,
      'gen_hand_score' => $gen_hand_score
    ];
  }

}
