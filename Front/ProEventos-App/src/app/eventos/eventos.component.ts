import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFiltrados: any = [];
  exibirImagem: boolean= true;
  private _filtroList: string = '';

  public get filtroList(): string {
    return this._filtroList;
  }

  public set filtroList(value: string) {
    this._filtroList = value;
    this.eventosFiltrados = this.filtroList ? this.filtrarEventos(this.filtroList) : this.eventos;
  }

  filtrarEventos(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
                       evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.GetEventos();
  }

  alterarImagem(){
    this.exibirImagem = !this.exibirImagem;
  }

  public GetEventos(): void {
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response => {
        this.eventos  = response,
        this.eventosFiltrados = this.eventos
      },
      error => console.log(error)
    );
  }
}
