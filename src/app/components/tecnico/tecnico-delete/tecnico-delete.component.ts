import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Tecnico } from '../../../models/tecnico';
import { TecnicoService } from '../../../services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css'],
})
export class TecnicoDeleteComponent implements OnInit {
  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: '',
  };

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

  findById(): void {
    this.tecnicoService.findById(this.tecnico.id).subscribe((resposta) => {
      resposta.perfis = [];
      this.tecnico = resposta;
    });
  }

  delete(): void {
    this.tecnicoService.delete(this.tecnico.id).subscribe(
      () => {
        this.toastService.success('Técnico deletado com sucesso', 'Delete');
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
}
