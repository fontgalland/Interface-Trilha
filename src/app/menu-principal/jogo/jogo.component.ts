import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';
import Piece from './helpers/piece';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss']
})
export class JogoComponent implements OnInit {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      height: 800,
      width: 800,
      scene: [ MainScene ],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 100 }
        }
      }
    };

   }

  ngOnInit(): void {
    this.phaserGame = new Phaser.Game(this.config);

  }

}

class MainScene extends Phaser.Scene {
  cursors;
  playerPieces = [0,0,0,0,0,0,0,0,0]
  dealPieces: () => void;
  piecesDealed = false;
  constructor() {
    super({ key: 'main' });
  }
  create() {
    this.add.image(400, 400, 'board');
    this.dealPieces = () => {
      for (let i = 0; i < this.playerPieces.length; i++) {
        let playerPiece = new Piece(this);
        playerPiece.render(50, 50 + (i*80 ), 'piece_player1');
      }
      this.piecesDealed = true;
    }

    this.input.on('drag', function (pointer, gameObject, dragX, dragY, player) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    })
  }

  preload() {
    this.load.image('board', '../../../assets/board.svg');
    this.load.image('piece_player1', '../../../assets/wood_piece.png');
    this.dealPieces();
  }

  update() {
    this.input.on('pointerdown', function (pointer) {
      if (!this.piecesDealed) {
        this.dealPieces();
      }
  }, this);
  }
}
