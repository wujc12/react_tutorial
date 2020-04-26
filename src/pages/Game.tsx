import React, {useState} from 'react';
import './Game.less';

// 判断胜负
const calculateWinner = (squares: Array<string>) => {
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
    return null;
};

interface SquareProps {
    value: any,
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
}

function Board (props: BoardProps) {
    const [squares, setSquares] = useState(Array(9).fill(null));
    // 设置轮流落子
    const [nextIsX, setNextIsX] = useState(true);

    const handleClick = (i: number) => {
        // 已经填了 X 或 O 的落子位不能落子；或者已有胜者决出，不再落子
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const newSquares = squares.slice();
        newSquares[i] = nextIsX ? 'X' : 'O';
        setNextIsX(!nextIsX);
        setSquares(newSquares);
    };
    const renderSquare = (i: number) => {
        return <Square value={squares[i]} onClick={() => {
            handleClick(i);
        }}/>;
    };

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (nextIsX ? 'X' : 'O');
    }
    return (
        <div>
            <div className="status">{status}</div>
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

interface GameProps {
}

export default function Game (props: GameProps) {
    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
}
