import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';
import Piece from './helpers/piece';
import Game from './helpers/game';
import io from 'socket.io-client';

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
  socket: any;
  isPlayerA: boolean;
  opponentPieces: any[];
  constructor() {
    super({ key: 'main' });
  }
  create() {

    this.socket = io('http://localhost:3000')
    this.isPlayerA = false;
    this.opponentPieces = [];
    let game = new Game(this);

    this.socket.on('connect', function() {
      console.log('connected!')
    })

    this.socket.on('isPlayerA', function() {
      this.isPlayerA = true;
    })

    this.socket.on('startGame', function () {
      this.game.startGame();
    })

    this.add.image(400, 400, 'board');

    this.input.on('drag', function (pointer, gameObject, dragX, dragY, player) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    })
  }

  preload() {
    this.load.image('board', '../../../assets/board.svg');
    this.load.image('piece_player1', '../../../assets/wood_piece.png');
  }

  update() {

  }
}
