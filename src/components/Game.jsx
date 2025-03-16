import "./Game.css"

import {useState, useRef} from "react";

const Game = ({score, guesses, wrongLetters, guessesLetters, normalizedLetters, word, category, verifyLetter}) => {
    const [letter, setLetter] = useState("");

    const letterInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        verifyLetter(letter)
        console.log(letter)
        setLetter("");

        letterInputRef.current.focus();
    };
    return (
        <div>
            <h1 className="main_title">Secret Word!</h1>
            <div className="scoreReg">
                Pontuacao:<span> {score}</span>
            </div>
            <div className="randomWord">
                <h3>Adivinhe a palavra</h3>
                Dica da palavra:<span > {category}</span>
            </div>
            <div className="guesses">
                Chances restantes:<span> {guesses}</span>
            </div>
            <div className="displayWord">
                {normalizedLetters && normalizedLetters.map((l, i) => (

                    guessesLetters.includes(l) ? (
    
                        <span className="square" key={i}>{l}</span>
                    ) : (
                        <span className="squareBlank" key={i}></span>
                    )
                ))}
            </div>
            <form className="guessed_input" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    required
                    maxLength="1"
                    value={letter}
                    onChange={(e) => setLetter(e.target.value)}
                    ref={letterInputRef}
                />
                <button className="btn">enviar</button>
            </form>
            <span>Letras que ja foram escolhidas </span>
            <div className="guessesLetters">
               {wrongLetters && wrongLetters.map((l, i) =>(
                    <span key={i}>{l}</span>
                ))}
            </div>
        </div>
    );
};

export default Game;