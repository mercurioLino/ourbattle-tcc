import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Organizacao } from 'src/app/models/organizacao.model';
import { OrganizacaoService } from '../organizacao.service';

@Component({
  selector: 'app-organizacao-create',
  templateUrl: './organizacao-create.component.html',
  styleUrls: ['./organizacao-create.component.scss']
})
export class OrganizacaoCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router:Router,
    private readonly organizacaoService: OrganizacaoService,
    private readonly fb: FormBuilder

  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      password: [null,[Validators.required]],
    });
  } 


  save(): void{
   this.form.markAllAsTouched();
    if(this.form.valid){

      const organizacao: Organizacao = this.form.value;

      this.organizacaoService.create(organizacao)
      .pipe(
        catchError((err) =>{
          this.organizacaoService.showMessage('Erro ao criar equipe', true);
          return err;
        })
      )

      .subscribe(resp => {
        this.organizacaoService.showMessage('Organizacao criada com sucesso!');
        this.router.navigate(['organizacao']);
      });

    }else{
      this.organizacaoService.showMessage('Dados incompletos', true);
    }
  }


  cancel():void{
    this.router.navigate(['organizacao/']);
  }

}
