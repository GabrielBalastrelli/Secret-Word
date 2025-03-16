//Import de hooks;
import { useState, useEffect, useCallback } from "react";
import React from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

//Import das palavras;
import { wordList } from "./data/wordList.js";

//Import Css;
import "./App.css";

//Import dos componentes do jogo;
import StarGame from "./components/StartGame";
import Game from "./components/Game";
import End from "./components/End";

function App() {
  {
    /*Criacao de array de estados*/
  }
  const states = [
    { id: 1, name: "start" },
    { id: 2, name: "game" },
    { id: 3, name: "end" },
  ];

  {
    /*Criacao de states do game*/
  }
  const [state, setState] = useState(states[0].name); //Estado inicial do jogo;
  const [score, setScore] = useState(0); //Pontuacao inicial;
  const [guesses, setGuesses] = useState(3); //Numero de tentativas inicias;
  const [word, setWord] = useState(""); //Seta a paalavra gerada;
  const [category, setCategory] = useState(""); //Seta a categoria gerada;
  const [normalizedLetters, setLetters] = useState(""); //Seta as letras da palavra;
  console.log("Estado inicial:", state);
  const [wrongLetters, setWrongLetters] = useState([]); //Armazena as letras erradas;
  const [guessesLetters, setGuessesLetters] = useState([]); //Armazenas as letras ja jogadas;
  const [showConfetti, setShowConfetti] = useState(false); // Controla o efeito de confete;

  const { width, height } = useWindowSize();
  {
    /*Funcao para selecionar aleatoriamente a palavra*/
  }
  const randomWordAndCategory = useCallback(() => {
    //Extrai as chaves de categorias;
    const categories = Object.keys(wordList);
    //Pega uma categoria aleatoria do array de chaves de categorias;
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    //Apartir da chave pegada aleatoriamete, pega uma palavra da categoria;
    const randomWord =
      wordList[randomCategory][
        Math.floor(Math.random() * wordList[randomCategory].length)
      ];

    return {
      randomWord,
      randomCategory,
    };
  }, [word]);

  const initalGame = useCallback(() => {
    clear();

    const { randomWord, randomCategory } = randomWordAndCategory();

    //Normalizar a palavra;
    const normalizedLetters = randomWord.toLowerCase().split("");
    setLetters(normalizedLetters);
    console.log(normalizedLetters);
    setWord(randomWord);
    setCategory(randomCategory);

    setState(states[1].name);
  }, [randomWordAndCategory]);

  //Funcao que processa o input da letra;
  const verifyLetter = (letter) => {
    const normLetter = letter.toLowerCase();
    if (
      wrongLetters.includes(normLetter) ||
      guessesLetters.includes(normLetter)
    ) {
      return;
    }

    if (normalizedLetters.includes(normLetter)) {
      setGuessesLetters((guessesLetters) => [...guessesLetters, normLetter]);
    } else {
      setWrongLetters((wrongLetters) => [...wrongLetters, normLetter]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  //funcao para limpar os states;
  const clear = () => {
    setWrongLetters([]);
    setGuessesLetters([]);
  };

  //Funcao para verificar se o jogador ainda tem chances para jogar;
  useEffect(() => {
    if (guesses <= 0) {
      clear();

      setState(states[2].name);
    }
  }, [guesses]);

  //funcao para verificar vencedor;
  useEffect(() => {
    const verifyWins = () => {
      const uniqueLetters = [...new Set(normalizedLetters)];

      if (uniqueLetters.length === guessesLetters.length) {
        setScore((actualScore) => (actualScore += 100));
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 10000);
        initalGame();
      }
    };
    if (state === "game") {
      verifyWins();
    }
  }, [guessesLetters, normalizedLetters, initalGame]);

  //Funcao para recomecar o jogo
  const retry = () => {
    setScore(0);
    setGuesses(3);
    setState(states[0].name);
  };

  return (
    <div className="App">
      {showConfetti && <Confetti width={width} height={height} />}
      {state && state === "start" && <StarGame initalGame={initalGame} />}
      {state && state === "game" && (
        <Game
          verifyLetter={verifyLetter}
          score={score}
          guesses={guesses}
          normalizedLetters={normalizedLetters}
          category={category}
          word={word}
          wrongLetters={wrongLetters}
          guessesLetters={guessesLetters}
        />
      )}
      {state && state === "end" && <End retry={retry} score={score} />}
    </div>
  );
}

export default App;
