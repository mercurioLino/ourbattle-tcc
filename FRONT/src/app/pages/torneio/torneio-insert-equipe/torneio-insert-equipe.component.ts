import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Equipe } from 'src/app/models/equipe.model';
import { Torneio } from 'src/app/models/torneio.model';
import { EquipeService } from '../../equipe/equipe.service';
import { TorneioService } from '../../torneio/torneio.service';

@Component({
  selector: 'app-torneio-insert-equipe',
  templateUrl: './torneio-insert-equipe.component.html',
  styleUrls: ['./torneio-insert-equipe.component.scss']
})
export class TorneioInsertEquipeComponent implements OnInit {
  equipes: Equipe[] = [];
  torneios: Torneio[] = [];
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router: Router,
    private readonly torneioService: TorneioService,
    private readonly equipeService: EquipeService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.equipeService.listEquipe().subscribe((resp) => {
      this.equipes = resp;
      this.equipes.sort((a: Equipe, b: Equipe) =>
        a.nome.localeCompare(b.nome)
      );
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
          this.torneioService.showMessage("Equipe inserida com sucesso");
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
