import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';
import Piece from './helpers/piece';
import Game from './helpers/game';
import Zone from './helpers/zone';
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
  zone: Zone;
  dropZone: any;
  outline: void;
  constructor() {
    super({ key: 'main' });
  }
  create() {

    let socket = io('http://localhost:3000', {transports: ['websocket', 'polling', 'flashsocket']})
    this.isPlayerA = false;
    this.opponentPieces = [];
    this.zone = new Zone(this);
    this.dropZone = this.zone.renderZone();
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone11);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone14);

    // this.outline = this.zone.renderOutline(this.dropZone.dropZone18);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone22);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone24);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone27);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone33);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone34);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone35);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone53);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone54);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone55);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone62);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone64);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone67);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone71);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone74);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone78);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone41);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone42);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone43);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone45);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone46);
    // this.outline = this.zone.renderOutline(this.dropZone.dropZone47);



    let game = new Game(this);

    socket.on('connect', function() {
      console.log('connected!')
      game.startGame();
      socket.emit('startGame');
    })

    socket.on('isPlayerA', function() {
      this.isPlayerA = true;
    })

    socket.on('startGame', function () {
      game.startGame();
    })

    socket.on('piecePlayed', function(gameObject, isPlayerA, dropZone) {
      if (isPlayerA == this.isPlayerA) {
        let sprite = gameObject.textureKey;
        console.log(this.opponentPieces);
        // this.opponentPieces.shift().destroy();
        console.log(dropZone)
        dropZone.data.values.occupied = true;
        let piece = new Piece(this);
        piece.render(dropZone.x,dropZone.y,sprite).disableInteractive();
      }
    })

    this.input.on('dragstart', function(pointer, gameObject) {
      gameObject.setTint(0xff69b4);
      // this.children.bringToTop(gameObject);
    })

    this.input.on('dragend', function(pointer, gameObject, dropped) {
      gameObject.setTint();
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    })

    this.input.on('drop', function(pointer, gameObject, dropZone) {
      if(dropZone.data.values.occupied) {
        console.log('casa ocupada');
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
      else {
        console.log(dropZone);
        dropZone.data.values.occupied = true;
        gameObject.x = dropZone.x;
        gameObject.y = dropZone.y;
        gameObject.disableInteractive();
        let zone = dropZone;
        socket.emit('piecePlayed', gameObject, this.isPlayerA, zone)
      }

    })
    this.add.image(400, 400, 'board');

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
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
