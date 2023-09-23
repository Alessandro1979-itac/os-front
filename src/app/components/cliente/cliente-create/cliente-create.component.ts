import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css'],
})
export class ClienteCreateComponent implements OnInit {
  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: '',
  };

  nome = new UntypedFormControl('', [Validators.minLength(3)]);
  cpf = new UntypedFormControl('', [Validators.required]);
  email = new UntypedFormControl('', [Validators.email]);
  senha = new UntypedFormControl('', [Validators.minLength(3)]);

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    /* TODO document why this method 'ngOnInit' is empty */
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      (_resposta) => {
        this.toastService.success('Cliente cadastrado com sucesso', 'Cadastro');
        this.router.navigate(['clientes']);
      },
      (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element) => {
            this.toastService.error(element.message);
          });
        } else {
          this.toastService.error(ex.error.message);
        }
      }
    );
  }

  addPerfil(perfil: any): void {
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else {
      this.cliente.perfis.push(perfil);
    }
  }

  validaCampos(): boolean {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
  }
}
