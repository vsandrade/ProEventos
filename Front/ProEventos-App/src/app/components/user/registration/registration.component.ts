import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControlOptions } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '@app/models/identity';
import { Router } from '@angular/router';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;
  user: User;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private toastr: ToastrService) {
  }

  get f(): any { return this.form.controls; }

  ngOnInit(): void {
    this.validation();
  }

  validation(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha', 'confirmeSenha')
    };

    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmeSenha: ['', Validators.required]
    }, formOptions);
  }

  cadastrarUsuario(): void {
    if (this.form.valid) {
      this.user = {
        senha: this.f.senha.value,
        ...this.form.value
      };
    }
  }

}
