import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Chamado } from '../../../models/chamado';
import { Cliente } from '../../../models/cliente';
import { Tecnico } from '../../../models/tecnico';
import { ChamadoService } from '../../../services/chamado.service';
import { ClienteService } from '../../../services/cliente.service';
import { TecnicoService } from '../../../services/tecnico.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css'],
})
export class ChamadoCreateComponent implements OnInit {
  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacao: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
  };

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  prioridade = new UntypedFormControl(null, [Validators.required]);
  status = new UntypedFormControl(null, [Validators.required]);
  titulo = new UntypedFormControl(null, [Validators.required]);
  observacao = new UntypedFormControl(null, [Validators.required]);
  tecnico = new UntypedFormControl(null, [Validators.required]);
  cliente = new UntypedFormControl(null, [Validators.required]);

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAllTecnicos();
    this.findAllClientes();
  }

  create(): void {
    this.chamadoService.create(this.chamado).subscribe(
      (resposta) => {
        this.toastService.success('Chamado criado com sucesso', 'Novo chamado');
        this.router.navigate(['chamados']);
      },
      (ex) => {
        this.toastService.error(ex.error.error);
        console.log(ex);
      }
    );
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe((resposta) => {
      this.clientes = resposta;
    });
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe((resposta) => {
      this.tecnicos = resposta;
    });
  }

  validaCampos(): boolean {
    return (
      this.prioridade.valid &&
      this.status.valid &&
      this.titulo.valid &&
      this.observacao.valid &&
      this.tecnico.valid &&
      this.cliente.valid
    );
  }
}
