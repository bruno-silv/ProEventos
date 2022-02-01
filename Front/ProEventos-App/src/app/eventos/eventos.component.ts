
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
  // providers: [EventoService]
})
export class EventosComponent implements OnInit {

  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[]  = [];
  public exibirImagem = true;
  private filtroListado: string = '';
  modalRef: any;

  public get filtroList(): string {
    return this.filtroListado;
  }

  public set filtroList(value: string) {
    this.filtroListado = value;
    this.eventosFiltrados = this.filtroList ? this.filtrarEventos(this.filtroList) : this.eventos;
  }

  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
                       evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }
  constructor(
    private eventoService: EventoService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) { }

  public ngOnInit(): void {
    this.GetEventos();
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }

  public alterarImagem(): void{
    this.exibirImagem = !this.exibirImagem;
  }

  public GetEventos(): void {
    this.eventoService.getEventos().subscribe(
      (eventosResp : Evento[]) => {
        this.eventos  = eventosResp,
        this.eventosFiltrados = this.eventos
      },
      error => console.log(error)
    );
  }

  confirm(): void {
    this.modalRef.hide();
    this.toastr.success('O evento foi deletado com sucesso!', 'Deletado!');
  }

  decline(): void {
    this.modalRef.hide();
  }
}
