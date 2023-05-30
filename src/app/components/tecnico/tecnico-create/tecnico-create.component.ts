import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Tecnico } from '../../../models/tecnico';
import { TecnicoService } from '../../../services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css'],
})
export class TecnicoCreateComponent implements OnInit {
  tecnico: Tecnico = {
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
    private tecnicoService: TecnicoService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    /* TODO document why this method 'ngOnInit' is empty */
  }

  create(): void {
    this.tecnicoService.create(this.tecnico).subscribe(
      () => {
        this.toastService.success('Técnico cadastrado com sucesso', 'Cadastro');
        this.router.navigate(['tecnicos']);
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
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    } else {
      this.tecnico.perfis.push(perfil);
    }
  }

  validaCampos(): boolean {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
  }
}
