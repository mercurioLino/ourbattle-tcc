import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Equipe } from 'src/app/models/equipe.model';
import { Jogador } from 'src/app/models/jogador.model';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { JogadorService } from '../../jogador/jogador.service';
import { EquipeService } from '../equipe.service';

@Component({
  selector: 'app-equipe-remove',
  templateUrl: './equipe-remove.component.html',
  styleUrls: ['./equipe-remove.component.scss']
})
export class EquipeRemoveComponent implements OnInit {

  equipes: Equipe[] = [];
  jogadores: Jogador[] = [];
  data: any;
  selected = this.jogadores[0]

  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router: Router,
    private readonly equipeService: EquipeService,
    private readonly jogadorService: JogadorService,
    private readonly authenticationService: AuthenticationService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.equipeService.listEquipe().subscribe((resp) => {
      this.equipes = resp;
      this.equipes.sort((a: Equipe, b: Equipe) => a.nome.localeCompare(b.nome));
    });
    this.data = this.authenticationService.getCurrentUserValue();
    // this.jogadorService.listJogador().subscribe((resp) => {
    //   this.jogadores = resp.filter(v => v.id === Number(this.data.id));
    // });
    
    this.form = this.fb.group({
      equipe: [null, [Validators.required]],
      jogador: [null, []]
    });
  }

  // onEquipeSelecionada(): void {
  //   const equipeId = this.form.get('equipe').value;
  //   if (equipeId) {
  //     this.jogadorService.listJogadorPorEquipe(equipeId).subscribe((resp) => {
  //       this.form.patchValue({ jogadores: resp });
  //     });
  //   } else {
  //     this.form.patchValue({ jogadores: [] });
  //   }
  // }
  
  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const data: any = this.form.value;
      console.log(data.jogador)
      this.equipeService
        .removerJogador(data.equipe.id, data.jogador)
        .pipe(
          catchError((err) => {
            this.equipeService.showMessage("Erro ao criar equipe", true);
            return err;
          })
        )

        .subscribe((resp) => {
          this.equipeService.showMessage("Equipe criada com sucesso!");
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
