import Piece from './piece';

export default class Game {
    startGame: () => void;
    constructor(scene) {
        this.startGame = () => {
            let playerSprite;
            let opponentSprite;
            if(scene.isPlayerA) {
                playerSprite = 'piece_player1';
                opponentSprite = 'piece_player1';
            } else {
                playerSprite = 'piece_player1';
                opponentSprite = 'piece_player1';
            }
            for (let i = 0; i < 9; i++) {
                let playerPiece = new Piece(scene);
                playerPiece.render(50, 50 + (i*80 ), playerSprite);

                let opponentPiece = new Piece(scene);
                scene.opponentPieces.push(opponentPiece.render(450, 50 + (i*80 ), opponentSprite).disableInteractive());
            }
        }
    }
}