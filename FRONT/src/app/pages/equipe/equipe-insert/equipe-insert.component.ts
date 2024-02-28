
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Equipe } from 'src/app/models/equipe.model';
import { Jogador } from 'src/app/models/jogador.model';
import { JogadorService } from '../../jogador/jogador.service';
import { EquipeService } from '../equipe.service';

@Component({
  selector: 'app-equipe-insert',
  templateUrl: './equipe-insert.component.html',
  styleUrls: ['./equipe-insert.component.scss']
})
export class EquipeInsertComponent implements OnInit {

  jogadores: Jogador[] = [];
  equipes: Equipe[] = [];
  form: FormGroup = new FormGroup({});
  constructor(private readonly router:Router,
    private readonly equipeService: EquipeService,
    private readonly jogadorService: JogadorService,
    private readonly fb: FormBuilder) { }

  ngOnInit(): void {

    this.jogadorService.listJogador().subscribe((resp) => {
      this.jogadores = resp;
      this.jogadores.sort((a: Jogador, b: Jogador) =>
        a.nickname.localeCompare(b.nickname)
      );
    });

    this.equipeService.listEquipe().subscribe((resp) => {
      this.equipes = resp;
      this.equipes.sort((a: Equipe, b: Equipe) =>
        a.nome.localeCompare(b.nome)
      );
    });

    this.form = this.fb.group({
      jogador: [null, [Validators.required]],
      equipe: [null, [Validators.required]],
    });
  }

  save(): void{
    this.form.markAllAsTouched();
    if(this.form.valid){

      const data: any = this.form.value;

      this.equipeService.inserirJogador(data.equipe.id, data.jogador)
      .pipe(
        catchError((err) =>{
          this.equipeService.showMessage('Erro ao criar equipe', true);
          return err;
        })
      )

      .subscribe(resp => {
        this.equipeService.showMessage('Equipe criada com sucesso!');
        this.router.navigate(['equipe']);
      });

    }else{
      this.equipeService.showMessage('Dados incompletos', true);
    }
  }

  cancel():void{
    this.router.navigate(['equipe']);
  }

}
