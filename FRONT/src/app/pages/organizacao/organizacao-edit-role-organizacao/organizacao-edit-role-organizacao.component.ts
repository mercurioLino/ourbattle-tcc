import { AuthenticationService } from './../../../shared/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { Organizacao } from 'src/app/models/organizacao.model';
import { OrganizacaoService } from '../organizacao.service';

@Component({
  selector: 'app-organizacao-edit-role-organizacao',
  templateUrl: './organizacao-edit-role-organizacao.component.html',
  styleUrls: ['./organizacao-edit-role-organizacao.component.scss']
})
export class OrganizacaoEditRoleOrganizacaoComponent implements OnInit {
  id!: number;
  form: FormGroup = new FormGroup({});
  organizacao!: Organizacao;
  constructor(
    private readonly router: Router,
    private readonly organizacaoService: OrganizacaoService,
    private readonly authenticationService: AuthenticationService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = Number(this.authenticationService.getCurrentUserValue()?.id);

    this.form = this.fb.group({
      razaoSocial: [null, [Validators.required]],
      cnpj: [null, [Validators.required]],
      nomeFantasia: [null, [Validators.required]],
      email: [null, [Validators.required]],
    });

    this.organizacaoService.findById(this.id).subscribe((resp) => {
      this.organizacao = resp;
      this.form.patchValue(this.organizacao);
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const organizacao: Organizacao = this.form.value;

      this.organizacaoService
        .update(this.id, organizacao)
        .pipe(
          catchError((err) => {
            this.organizacaoService.showMessage("Erro ao alterar organizacao", true);
            return err;
          })
        )

        .subscribe((resp) => {
          this.organizacaoService.showMessage("Organizacao atualizada com sucesso!");
          this.router.navigate(["organizacao"]);
        });
    } else {
      this.organizacaoService.showMessage("Dados incompletos", true);
    }
  }

  cancel(): void {
    this.router.navigate(["organizacao"]);
  }
}
