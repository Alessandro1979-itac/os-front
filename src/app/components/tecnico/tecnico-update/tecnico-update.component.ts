import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Tecnico } from '../../../models/tecnico';
import { TecnicoService } from '../../../services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css'],
})
export class TecnicoUpdateComponent implements OnInit {
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
    private route: ActivatedRoute,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  update(): void {
    this.tecnicoService.update(this.tecnico).subscribe(
      () => {
        this.toastService.success('Técnico atualizado com sucesso', 'Update');
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

  findById(): void {
    this.tecnicoService.findById(this.tecnico.id).subscribe((resposta) => {
      resposta.perfis = [];
      this.tecnico = resposta;
    });
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
