<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Result extends Model
{

  protected $fillable = [
    'user_id', 'user_score', 'gen_hand_score', 'winner'
  ];

  public function users()
  {
    return $this->belongsTo('App\User', 'user_id', 'id');
  }
}
