import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Credenciais } from '../../models/credenciais';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  creds: Credenciais = {
    email: '',
    senha: '',
  };

  email = new UntypedFormControl('', [Validators.email]);
  senha = new UntypedFormControl('', [Validators.minLength(3)]);

  constructor(
    private toastService: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    /* TODO document why this method 'ngOnInit' is empty */
  }

  logar() {
    this.authService.authenticate(this.creds).subscribe(
      (resposta) => {
        this.authService.successfulLogin(
          resposta.headers.get('Authorization')!.substring(7)
        );
        this.router.navigate(['']);
      },
      () => {
        this.toastService.error('Usuário e/ou senha inválidos');
      }
    );
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }
}
