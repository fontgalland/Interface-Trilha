import { LojaService } from './../../services/loja.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.scss']
})
export class LojaComponent implements OnInit {

  constructor(private lojaService: LojaService) { }

  ngOnInit(): void {
  }

  listarItems() {
    this.lojaService.listItem().subscribe(resp => {
      console.log(resp);
    })
  }

}
