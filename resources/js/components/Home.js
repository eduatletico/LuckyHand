import React, { useState, useEffect } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function TableData() {
  const [name, setName] = useState('')
  const [cards, setCards] = useState('')
  const [nameError, setNameError] = useState('')
  const [cardsError, setCardsError] = useState('')

  const [userHand, setUserHand] = useState('')
  const [genHand, setGenHand] = useState('')

  const [textResult, setTextResult] = useState('')
  const [textResultScore, setTextResultScore] = useState('')

  const [tableBody, setTableBody] = useState()


  useEffect(() => {
    axios.get('/api/leaderboard').then(response => {
      setTableBody(renderTableData(response.data))
    })
  }, [])

  function renderTableData(leaders) {
    if (leaders.length > 0) {
      let header = Object.keys(leaders[0])
      return leaders.map((player, index) => {
        return (
          <tr key={Math.random()}>
            {header.map((h) => <td key={Math.random()}>{player[h]}</td>)}
          </tr>
        )
      })
    }
  }

  function handlePlayButton() {
    setNameError('')
    setCardsError('')

    axios.post('/api/play', {
      user_name:name,
      user_hand:cards
    }).then(response => {
      let res = response.data

      setUserHand(res.userHand)
      setGenHand(res.genHand)
      setTextResult(res.textResult)
      setTextResultScore(`User Score: ${res.scores.user_score} / Generated Hand Score: ${res.scores.gen_hand_score}`)

      axios.get('/api/leaderboard').then(response => {
        setTableBody(renderTableData(response.data))
      })

    }).catch(error => {
      let errors = error.response.data.errors

      for (var key in errors) {
        if (key === 'user_name') {
          setNameError(errors[key][0])
        }
        if (key === 'user_hand') {
          setCardsError(errors[key][0])
        }
      }
    })
  }

  function handlePlayAgainButton() {
    setName('')
    setCards('')
    setNameError('')
    setCardsError('')
    setUserHand('')
    setGenHand('')
    setTextResult('')
    setTextResultScore('')
  }

  function handleChangeName(value) {
    if (value.length > 0) {
      let name = value.toUpperCase()
      setName(name)
    } else {
      setName('')
    }
  }

  function handleChangeCards(value) {
    if (value.length > 0) {
      let hand = value.replace(/\s/g, "").toUpperCase()
      if (value.length > 1) {
        hand = hand.split("").join(" ")
        hand = hand.replace(/1 0/g, "10")
      }
      setCards(hand)
    } else {
      setCards('')
    }
  }

  return (
    <div>
      <div className="user-data label-top">
        <div className="input-user">
          <div className="label">User Name</div>
        </div>
        <div className="input-user">
          <div className="label">User Cards</div>
        </div>
      </div>

      <div className="user-data">
        <div className="input-user">
          <DebounceInput
            value={name}
            minLength={1}
            debounceTimeout={5}
            placeholder="Type your name"
            onChange={event => handleChangeName(event.target.value)}
          />
        </div>
        <div className="input-user">
          <DebounceInput
            value={cards}
            minLength={1}
            debounceTimeout={5}
            placeholder="Type your cards"
            onChange={event => handleChangeCards(event.target.value)}
          />
        </div>
      </div>

      <div className="user-data error-user-data">
        <div className="error-input-user">
          <div className="error-msg" style={nameError===""?{display:'none'}:{display:'flex'}}>{nameError}</div>
        </div>
        <div className="error-input-user">
          <div className="error-msg" style={cardsError===""?{display:'none'}:{display:'flex'}}>{cardsError}</div>
        </div>
      </div>

      <div className="results">
        <div className="hand">
          <div className="cards-label" style={userHand===""?{display:'none'}:{display:'inline'}}>User Hand</div>
          <div className="cards" style={userHand===""?{display:'none'}:{display:'flex'}}>
            {userHand}
          </div>
        </div>
        <button className="btn" style={textResult===""?{display:'inline'}:{display:'none'}} onClick={handlePlayButton}>PLAY</button>
        <button className="btn play-again" style={textResult===""?{display:'none'}:{display:'inline'}} onClick={handlePlayAgainButton}>PLAY AGAIN</button>
        <div className="hand">
          <div className="cards-label" style={genHand===""?{display:'none'}:{display:'inline'}}>Generated Hand</div>
          <div className="cards" style={genHand===""?{display:'none'}:{display:'flex'}}>
            {genHand}
          </div>
        </div>
      </div>

      <div className="message">
        <div className="text" style={textResult===""?{display:'none'}:{display:'flex'}}>{textResult}</div>
      </div>
      <div className="message">
        <div className="text score" style={textResultScore===""?{display:'none'}:{display:'flex'}}>{textResultScore}</div>
      </div>

      <div className="label">Leaderboard</div>
      <table id='leaderboard'>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Hands Played</th>
            <th>Wins</th>
          </tr>
          {tableBody}
        </tbody>
      </table>

    </div>
  )
}
