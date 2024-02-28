import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { timingSafeEqual } from 'crypto';
import { catchError } from 'rxjs';
import { Equipe } from 'src/app/models/equipe.model';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { EquipeService } from '../../equipe/equipe.service';

@Component({
  selector: 'app-equipe-edit-role-jogador',
  templateUrl: './equipe-edit-role-jogador.component.html',
  styleUrls: ['./equipe-edit-role-jogador.component.scss']
})
export class EquipeEditRoleJogadorComponent  implements OnInit {
  id!: number;
  form: FormGroup = new FormGroup({});
  formEquipe: FormGroup = new FormGroup({});
  equipes: Equipe[] = [];
  equipe!: Equipe;
  idJogador!: number
  constructor(
    private readonly router: Router,
    private readonly equipeService: EquipeService,
    private readonly fb: FormBuilder,
    private readonly authenticationService: AuthenticationService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idJogador = Number(this.authenticationService.getCurrentUserValue()?.id)
    this.formEquipe = this.fb.group({
      equipe: [null, [Validators.required]],
    })
    this.form = this.fb.group({
      nome: [null, [Validators.required]]
    });

    this.equipeService.listEquipe().subscribe((resp) => {
      
      this.equipes = resp.filter(e => e.jogadores.map(v => v.id).includes(this.idJogador));
      console.log(this.equipes);
    })

    this.formEquipe.get('equipe')?.valueChanges.subscribe((resp) => {
      this.id = resp.id;
      this.form.patchValue(resp);
    });

  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const equipe: Equipe = this.form.value
      this.equipeService
        .update(this.id, equipe)
        .pipe(
          catchError((err) => {
            this.equipeService.showMessage("Erro ao alterar equipe", true);
            return err;
          })
        )

        .subscribe((resp) => {
          this.equipeService.showMessage("Equipe atualizada com sucesso!");
          this.router.navigate(["equipe"]);
        });
    } else {
      this.equipeService.showMessage("Dados incompletos", true);
    }
  }

  cancel(): void {
    this.router.navigate(["equipe"]);
  }
}
