import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Equipe } from 'src/app/models/equipe.model';
import { Torneio } from 'src/app/models/torneio.model';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { EquipeService } from '../../equipe/equipe.service';
import { TorneioService } from '../../torneio/torneio.service';

@Component({
  selector: 'app-torneio-insert-equipe-role-jogador',
  templateUrl: './torneio-insert-equipe-role-jogador.component.html',
  styleUrls: ['./torneio-insert-equipe-role-jogador.component.scss']
})
export class TorneioInsertEquipeRoleJogadorComponent implements OnInit {
  equipes: Equipe[] = [];
  torneios: Torneio[] = [];
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router: Router,
    private readonly torneioService: TorneioService,
    private readonly equipeService: EquipeService,
    private readonly authenticationService: AuthenticationService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {

    const data = this.authenticationService.getCurrentUserValue();
    this.equipeService.listEquipe().subscribe((resp) => {
      this.equipes = resp.filter(v => v.jogadores.map(j => j.id).includes(Number(data?.id)))
    });

    this.torneioService.listTorneio().subscribe((resp) => {
      this.torneios = resp;
      this.torneios.sort((a: Torneio, b: Torneio) => a.nome.localeCompare(b.nome));
    });

    this.form = this.fb.group({
      equipe: [null, [Validators.required]],
      torneio: [null, [Validators.required]],
    });
  }

  save(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const data: any = this.form.value;

      this.torneioService
        .inserirEquipe(data.torneio.id, data.equipe)
        .pipe(
          catchError((err) => {
            this.torneioService.showMessage("Erro ao inserir equipe no torneio", true);
            return err;
          })
        )

        .subscribe((resp) => {
          this.torneioService.showMessage("Equipe inserido com sucesso");
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
