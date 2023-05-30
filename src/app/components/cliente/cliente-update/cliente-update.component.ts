import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css'],
})
export class ClienteUpdateComponent implements OnInit {
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
    private route: ActivatedRoute,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.clienteService.findById(this.cliente.id).subscribe((resposta) => {
      resposta.perfis = [];
      this.cliente = resposta;
    });
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(
      () => {
        this.toastService.success('Cliente atualizado com sucesso', 'Update');
        this.router.navigate(['clientes']);
      },
      (ex) => {
        if (ex.error.errors) {
          ex.error.erros.forEach((element) => {
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