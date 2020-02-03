## ACTO Take Home Assignment - Lucky Hand
> A Card Game between you and your PC

### Requirements:
Your task is to create a Laravel application using an API & relational database for the backend and Vue.js for the frontend.

#### The application should have one page which includes

* an input field which allows users to enter their name (required)
* an input field which allows users to enter a hand of cards, each card should be separated by a space. For example: 1 4 6 J K A
* valid cards include: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A
* a ‘Play’ button, when this is clicked a random hand of cards with the same amount of cards that the user entered should be generated and displayed to the user.
* The user’s hand of cards should then be compared to the generated hand of cards. Each card in the player’s hand should be compared to the card in the same position in the generated hand. Highest value card wins. For example:
  * Player’s hand: 5 7 A K
  * Generated Hand: 4 8 K Q
* A score should be calculated for the player and generated hand, in this example it would be:
  * Player: 3
  * Generated: 1
* The results of the game should then be shown to the user
* The results should also be stored in the database, each row should represent one play this should include:
  * the user’s name
  * the user’s score
  * the generated hand score
  * a boolean indicating whether the user won
  * timestamps
* A leaderboard should be shown at the bottom of page with each user’s name and the total number of games and hands that they have won.
* Validation should be included on the API to ensure that a name is provided and all of the cards are valid. Any validation messages should be displayed to the user.


#### Additional info:
* user authentication is not required
* UI and styling is not required, basic bootstrap would be great
* The main focus of this assignment is on code quality, minor details are not important.

#### Submission:
* Create a public repo on your Github account and send us the link

### Installation
Clone the GitHub repository, install the dependencies and start the server

```
$ git clone https://github.com/eduatletico/LuckyHand.git
```

### Usage
This assumes that you already configured your database on .env file

```
$ cd LuckyHand
$ composer install
$ php artisan key:generate
$ php artisan migrate
$ php -S localhost:8000 -t public
```

### Test
You can test accessing **[http://localhost:8000/](http://localhost:8000/)**



This project was created with [Laravel PHP Framework](https://laravel.com/docs/) and [ReactJS Library](https://reactjs.org/).
