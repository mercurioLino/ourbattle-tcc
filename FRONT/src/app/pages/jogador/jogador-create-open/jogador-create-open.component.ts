import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Jogador } from 'src/app/models/jogador.model';
import { JogadorService } from '../jogador.service';

@Component({
  selector: 'app-jogador-create',
  templateUrl: './jogador-create-open.component.html',
  styleUrls: ['./jogador-create-open.component.scss']
})
export class JogadorCreateOpenComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private readonly router:Router,
    private readonly jogadorService: JogadorService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      nickname: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  save(): void{
    this.form.markAllAsTouched();
    if(this.form.valid){

      const jogador: Jogador = this.form.value;

      this.jogadorService.create(jogador)
      .pipe(
        catchError((err) =>{
          this.jogadorService.showMessage('Erro ao criar jogador', true);
          return err;
        })
      )
      .subscribe(resp => {
        this.jogadorService.showMessage('Jogador criado com sucesso!');
        this.router.navigate(['jogador']);
      });

    }else{
      this.jogadorService.showMessage('Dados incompletos', true);
    }
  }

  cancel():void{
    this.router.navigate(['jogador']);
  }
}
