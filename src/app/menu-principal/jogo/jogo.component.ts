import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';

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

  constructor() {
    super({ key: 'main' });
  }
  create() {
    this.add.image(400, 400, 'board');


  }
  preload() {
    this.load.image('board', '../../../assets/board.svg');
    this.load.image('piece_player1', '../../../assets/I magem2.svg');

  }
  update() {
    this.input.on('pointerdown', function (pointer) {

      console.log('down');

      this.add.sprite(pointer.x, pointer.y, 'piece_player1');

  }, this);
  }
}
