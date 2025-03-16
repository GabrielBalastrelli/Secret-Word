const End = ({retry, score}) => {
    return (
        <div>
            <h1 className="main_title" >Fim de jogo</h1>
            <span>Pontuacao Final: {score}</span>
            <button className="btn" onClick={retry}>Jogar Novamente</button>
        </div>
    );
};

export default End;