import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Evento } from '@app/models/Evento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  evento = {} as Evento;
  modoEditar = false;
  loading = false;

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }

  get redesSociais(): FormArray {
    return this.form.get('redesSociais') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    if (this.id !== null && this.id !== undefined) {
      this.modoEditar = true;
    }

    this.validation();
  }

  get f(): any { return this.form.controls; }

  public validation(): void {
    this.form = this.fb.group({
      id: [],
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      imagemURL: [''],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lotes: this.fb.array([]),
      redesSociais: this.fb.array([])
    });
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

  criaLote(lote: any): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim]
    });
  }

  criaRedeSocial(redeSocial: any): FormGroup {
    return this.fb.group({
      id: [redeSocial.id],
      nome: [redeSocial.nome, Validators.required],
      url: [redeSocial.url, Validators.required]
    });
  }

  adicionarLote(): void {
    this.lotes.push(this.criaLote({ id: 0 }));
  }

  adicionarRedeSocial(): void {
    this.redesSociais.push(this.criaRedeSocial({ id: 0 }));
  }

  removerLote(id: number): void {
    this.lotes.removeAt(id);
  }

  removerRedeSocial(id: number): void {
    this.redesSociais.removeAt(id);
  }

}
