<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class Hand implements Rule
{
  private $av_cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

  public function passes($attribute, $value)
  {
    $av_cards = $this->av_cards;
    $value = collect(explode(" ", $value));

    $value->transform(function ($item, $key) use ($av_cards) {
      return in_array($item, $av_cards) == true ? $item : false;
    });

    if (in_array(false, $value->toArray())) {
      return false;
    }

    return true;
  }

  public function message()
  {
    return 'You need to type a valid card: 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K or A';
  }
}
