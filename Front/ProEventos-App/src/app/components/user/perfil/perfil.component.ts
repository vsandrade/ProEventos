import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { UserService } from '@app/services/user.service';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  form!: FormGroup;
  id!: string;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
    ) {}

    ngOnInit(): void {
      this.id = this.route.snapshot.params.id;

      const formOptions: AbstractControlOptions = {
        validators: ValidatorField.MustMatch('senha', 'confirmeSenha')
      };

      this.form = this.fb.group({
        titulo: ['', Validators.required],
        primeiroNome: ['', Validators.required],
        ultimoNome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefone: ['', [Validators.required]],
        descricao: ['', Validators.required],
        funcao: ['', Validators.required],
        senha: ['', [Validators.minLength(6), Validators.nullValidator]],
        confirmeSenha: ['', Validators.nullValidator]
      }, formOptions);

      this.userService.getById(this.id)
      // tslint:disable-next-line: deprecation
      .subscribe((x: any) => this.form.patchValue(x));
    }

    // Conveniente para pegar um FormField apenas com a letra F
    get f(): any { return this.form.controls; }

    onSubmit(): void {
      this.submitted = true;

      // Vai parar aqui se o form estiver inválido
      if (this.form.invalid) {
        return;
      }

      this.loading = true;
      this.updateUser();
    }

    private createUser(): void {
      this.userService.create(this.form.value)
      // tslint:disable-next-line: deprecation
      .subscribe(() => {
        this.toastr.success('Usuário Cadastrado');
        this.router.navigate(['../'], { relativeTo: this.route });
      })
      .add(() => this.loading = false);
    }

    public resetForm(event: any): void {
      event.preventDefault();
      this.submitted = false;
      this.form.reset();
    }

    private updateUser(): void {
      this.userService.update(this.id, this.form.value)
      // tslint:disable-next-line: deprecation
      .subscribe(() => {
        this.toastr.success('Atualização realizada com Sucesso');
        this.router.navigate(['../../'], { relativeTo: this.route });
      })
      .add(() => this.loading = false);
    }
}
