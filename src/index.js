import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     // eacch squir contains its value X or O
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //         value: null,
//     //     };
//     // }
//     render() {

//         return (

//             <button className="square"
//                 onClick={() => this.props.onClick()}
//                     // this.setState({ value: 'x' })
//             >
//                 {this.props.value}
//             </button>
//         );
//     }
// }
function Square(props) {

    return (
        <button className="square" onClick={props.onClick} >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    // bord will pass if a squir is X or O and change state wit change state
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         XIsNext: true,
    //     };
    // }

    // handleClick(i) {
    //     const squares = this.state.squares.map(a => a);
    //     // squares[i] = 'x';
    //     if (declareWinner(squares) || squares[i]) {
    //         return;
    //     }
    //     squares[i] = this.state.XIsNext ? 'X' : 'O';
    //     this.setState({
    //         squares: squares,
    //         XIsNext: !this.state.XIsNext,
    //     });
    // }

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                 
            />
        );
    }

    render() {
        // const winner = declareWinner(this.state.squares)
        // let status;
        // if (winner) {
        //     status = 'Winner ' + winner;
        // } else {
        //     status = 'Next player is ' + (this.state.XIsNext ? 'X' : 'O');
        // }
        return (
            <div>
                {/* <div >{status}</div> */}
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            XIsNext: true,
            stepNumber: 0,
        };
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1]; // get the current stste as histories state
        const squares = current.squares.slice();
        // const winner = declareWinner(current.squares);
        // let status ;

        if (declareWinner(squares) || squares[i]) {

            return;
        }
        squares[i] = this.state.XIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                }]),
            XIsNext: !this.state.XIsNext,
            stepNumber: history.length,
        });

    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            XIsNext: (step % 2) === 0,
        });
    }
    render() {

        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = declareWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move # ' + move :
                'Go to game start ';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        }
        );

        let status;
        if (winner) {
            status = 'Winner ' + winner;
            
            // Square.addcss('borderColor','red');
        }
        else  if(current.squares.includes(null)){
            status = 'Next player ' + (this.state.XIsNext ? 'X' : 'O');
        }
        else{
            status = 'Draw';
        }
        return (
            <div className="game">
                <div className="game-board"> 
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        // winner = {winner}
                    />
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function declareWinner(squares) {

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
}
// ========================================


