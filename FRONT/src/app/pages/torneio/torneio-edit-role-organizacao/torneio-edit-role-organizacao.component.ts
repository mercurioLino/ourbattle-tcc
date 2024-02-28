import { AuthenticationService } from './../../../shared/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Torneio } from 'src/app/models/torneio.model';
import { TorneioService } from '../torneio.service';

@Component({
  selector: 'app-torneio-edit-role-organizacao',
  templateUrl: './torneio-edit-role-organizacao.component.html',
  styleUrls: ['./torneio-edit-role-organizacao.component.scss']
})
export class TorneioEditRoleOrganizacaoComponent implements OnInit {
  id!: number;
  form: FormGroup = new FormGroup({});
  torneio!: Torneio;
  formTorneio: FormGroup = new FormGroup({});
  torneios: Torneio[] = [];
  idOrganizacao!: number
  constructor(
    private readonly router: Router,
    private readonly torneioService: TorneioService,
    private readonly fb: FormBuilder,
    private readonly authenticationService: AuthenticationService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idOrganizacao = Number(this.authenticationService.getCurrentUserValue()?.id)

    this.formTorneio = this.fb.group({
      torneio: [null, [Validators.required]],
    })

    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      data: [null, [Validators.required]],
      hora: [null, [Validators.required]],
      regras: [null, [Validators.required]],
      premiacao: [null, [Validators.required]]
    });

    this.torneioService.findById(this.id).subscribe((resp) => {
      this.torneio = resp;
      this.form.patchValue(this.torneio);
    });

    this.torneioService.listTorneio().subscribe((resp) => {
      this.torneios = resp.filter(v => v.organizacao.id === this.idOrganizacao)
    })

    this.formTorneio.get('torneio')?.valueChanges.subscribe((resp) => {
      this.id = resp.id;
      this.form.patchValue(resp);
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const torneio: Torneio = this.form.value;

      this.torneioService
        .update(this.id, torneio)
        .pipe(
          catchError((err) => {
            this.torneioService.showMessage("Erro ao alterar torneio", true);
            return err;
          })
        )

        .subscribe((resp) => {
          this.torneioService.showMessage("Torneio atualizada com sucesso!");
          this.router.navigate(["torneio"]);
        });
    } else {
      this.torneioService.showMessage("Dados incompletos", true);
    }
  }

  cancel(): void {
    this.router.navigate(["torneio"]);
  }
}

