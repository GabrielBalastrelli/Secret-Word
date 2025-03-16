
const StartGame = ({initalGame}) => {
    return (
        <div>
            <h1 className="main_title" >Secret Word!</h1>
            <p>Venha se divertir adivinhando palavras.</p>
            <p>Click para comecar a jogar...</p>
            <button className="btn" onClick={initalGame}>Jogar</button>
        </div>
    );
};

export default StartGame;