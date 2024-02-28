
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Jogador } from 'src/app/models/jogador.model';
import { Jogo } from 'src/app/models/jogo.model';
import { JogadorService } from '../../jogador/jogador.service';
import { JogoService } from '../jogo.service';

@Component({
  selector: 'app-jogo-create',
  templateUrl: './jogo-create.component.html',
  styleUrls: ['./jogo-create.component.scss']
})
export class JogoCreateComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private readonly router: Router,
    private readonly jogoService: JogoService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit() {

    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      regras: [null, [Validators.required]],
    });
  }

  save(): void{
    this.form.markAllAsTouched();
    if(this.form.valid){

      const jogo: Jogo = this.form.value;

      this.jogoService.create(jogo)
      .pipe(
        catchError((err) =>{
          this.jogoService.showMessage('Erro ao criar jogo', true);
          return err;
        })
      )
      .subscribe(resp => {
        this.jogoService.showMessage('Jogo criado com sucesso!');
        this.router.navigate(['jogo']);
      });

    }else{
      this.jogoService.showMessage('Dados incompletos', true);
    }
  }

  cancel():void{
    this.router.navigate(['jogo']);
  }
}
