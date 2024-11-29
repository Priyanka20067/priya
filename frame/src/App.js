import React, { useState } from 'react';
import './App.css'; // Import the CSS file

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
    answer: 'Paris'
  },
  {
    question: 'Who wrote "Hamlet"?',
    options: ['Shakespeare', 'Homer', 'Tolstoy', 'Dante'],
    answer: 'Shakespeare'
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    answer: 'Jupiter'
  },
  {
    question: 'What is the boiling point of water?',
    options: ['50°C', '100°C', '150°C', '200°C'],
    answer: '100°C'
  },
  {
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Claude Monet'],
    answer: 'Leonardo da Vinci'
  },
  {
    question: 'What is the hardest natural substance on Earth?',
    options: ['Gold', 'Iron', 'Diamond', 'Platinum'],
    answer: 'Diamond'
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Mercury', 'Jupiter'],
    answer: 'Mars'
  },
  {
    question: 'Which ocean is the largest?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    answer: 'Pacific Ocean'
  },
  {
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    answer: 'Au'
  },
  {
    question: 'Who was the first person to walk on the Moon?',
    options: ['Neil Armstrong', 'Yuri Gagarin', 'Buzz Aldrin', 'Michael Collins'],
    answer: 'Neil Armstrong'
  }
];

function App() {
  const [gameState, setGameState] = useState('start'); // 'start', 'quiz', 'result'
  const [players, setPlayers] = useState([{ name: '', score: 0 }]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [highScorePlayer, setHighScorePlayer] = useState(null);

  const addPlayer = () => {
    setPlayers([...players, { name: '', score: 0 }]);
  };

  const handlePlayerNameChange = (index, value) => {
    const newPlayers = [...players];
    newPlayers[index].name = value;
    setPlayers(newPlayers);
  };

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      const newPlayers = [...players];
      newPlayers[currentPlayerIndex].score += 1;
      setPlayers(newPlayers);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    } else {
      const maxScorePlayer = players.reduce((maxPlayer, player) =>
        player.score > maxPlayer.score ? player : maxPlayer
      , players[0]);
      setHighScorePlayer(maxScorePlayer);
      setGameState('result');
    }
  };

  const startQuiz = () => {
    if (players.every(player => player.name.trim() !== '')) {
      setGameState('quiz');
    } else {
      alert('Please enter names for all players');
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setPlayers(players.map(player => ({ ...player, score: 0 })));
    setGameState('quiz');
  };

  const resetToStart = () => {
    setPlayers([{ name: '', score: 0 }]);
    setCurrentQuestion(0);
    setGameState('start');
  };

  return (
    <div className="App">
      {gameState === 'start' && (
        <div className="start-screen">
          <h1>Welcome to the Quiz Game!</h1>
          <h2>Enter player names:</h2>
          {players.map((player, index) => (
            <input
              key={index}
              type="text"
              className="player-input"
              placeholder={`Player ${index + 1} Name`}
              value={player.name}
              onChange={(e) => handlePlayerNameChange(index, e.target.value)}
            />
          ))}
          <div className="button-group">
            <button onClick={addPlayer} className="button">Add Player</button>
            <button onClick={startQuiz} className="button">Start Quiz</button>
          </div>
        </div>
      )}

      {gameState === 'quiz' && (
        <div className="quiz-screen">
          <h2>{players[currentPlayerIndex].name}'s Turn</h2>
          <h3>{questions[currentQuestion].question}</h3>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)} className="option-button">
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {gameState === 'result' && (
        <div className="result-screen">
          <h1>Quiz Over!</h1>
          <div className="scores">
            {players.map((player, index) => (
              <p key={index} className="score">
                {player.name}'s Score: {player.score}
              </p>
            ))}
          </div>

          {highScorePlayer && (
            <div className="high-score">
              <h2>High Score</h2>
              <p>
                {highScorePlayer.name} achieved the highest score: {highScorePlayer.score}
              </p>
            </div>
          )}

          <div className="button-group">
            <button onClick={restartQuiz} className="button">Restart Quiz</button>
            <button onClick={resetToStart} className="button">Go to Start</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;