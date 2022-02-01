import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {
  // public titulo: 'O DA ROÇAAAA' = "O DA ROÇAAAA";
  @Input() titulo = '';

  constructor() { }

  ngOnInit(): void {
  }

}
