import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estatistica',
  templateUrl: './estatistica.component.html',
  styleUrls: ['./estatistica.component.scss']
})
export class EstatisticaComponent implements OnInit {

  rankings = [
    {
      position: 1,
      username: 'dieguito'
    },
    {
      position: 1,
      username: 'dieguito'
    }, 
    {
      position: 1,
      username: 'dieguito'
    }, 
    {
      position: 1,
      username: 'dieguito'
    }, 
    {
      position: 1,
      username: 'dieguito'
    }, 
    {
      position: 1,
      username: 'dieguito'
    },
    {
      position: 1,
      username: 'dieguito'
    },
    {
      position: 1,
      username: 'dieguito'
    }, 
    {
      position: 1,
      username: 'dieguito'
    }, 
    {
      position: 1,
      username: 'dieguito'
    }, 
    {
      position: 1,
      username: 'dieguito'
    }, 
    {
      position: 1,
      username: 'dieguito'
    }
  ]
  constructor() { }


  ngOnInit(): void {
    console.log(this.rankings)
  }

}
