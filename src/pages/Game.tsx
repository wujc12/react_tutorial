import React, {useState} from 'react';
import './Game.css';

/**
 * 根据棋盘数组的输入判断胜负
 * @param squares
 * @return X：X胜出；O：O胜出；null：暂无胜出者；even：平局
 */
const calculateWinner = (squares: Array<any>) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    // squares 已经满了，但是没有胜者，因此判断平局
    if (!squares.includes(null)) {
        return 'even';
    }
    return null;
};

interface SquareProps {
    value: any; // 可能是字符串，也可能是null
    onClick: () => void;
}

function Square (props: SquareProps) {
    const {value, onClick} = props;
    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
}

interface BoardProps {
    squares: Array<any>;
    onClick: (i: number) => void;
}

function Board (props: BoardProps) {
    const {squares, onClick} = props;

    const renderSquare = (i: number) => {
        return <Square value={squares[i]} onClick={() => {
            onClick(i);
        }}/>;
    };

    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

export default function Game () {
    // 棋盘棋子状态记录
    const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
    // 下一个是否为 X 落子，默认 X 先手
    const [nextIsX, setNextIsX] = useState(true);
    // 当前的步数
    const [stepNumber, setStepNumber] = useState(0);

    const handleClick = (i: number) => {
        const current = history[stepNumber];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = nextIsX ? 'X' : 'O';
        setHistory(history.concat([{
            squares: squares,
        }]));
        setNextIsX(!nextIsX);
        setStepNumber(stepNumber + 1);
    };

    const jumpTo = (step: number) => {
        setStepNumber(step);
        setNextIsX(step % 2 === 0);
        setHistory(history.slice(0, step + 1));
    };

    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => {jumpTo(move)}}>{desc}</button>
            </li>
        );
    });

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner === 'X' || winner === 'O') {
        status = 'Winner is: ' + winner;
    } else if (winner === 'even') {
        status = 'Play is Even!';
    } else {
        status = 'Next player: ' + (nextIsX ? 'X' : 'O');
    }

    return (
        <div className="game">
            <div className="game-board">
                <div className="game-title">
                    三子棋：
                </div>
                <Board squares={current.squares} onClick={(i) => {
                    handleClick(i);
                }} />
            </div>
            <div className="game-info">
                <div className={['X', 'O'].includes(winner) ? "winner-text" : "no-winner-text"}>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}
