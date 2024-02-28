import { AuthenticationService } from "./../../../shared/authentication.service";
import { Component, OnInit } from "@angular/core";
import { Equipe } from "src/app/models/equipe.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EquipeService } from "../equipe.service";
import { Router } from "@angular/router";
import { Jogador } from "src/app/models/jogador.model";
import { catchError } from "rxjs";
import { JogadorService } from "../../jogador/jogador.service";

@Component({
  selector: "app-equipe-insert-role-jogador",
  templateUrl: "./equipe-insert-role-jogador.component.html",
  styleUrls: ["./equipe-insert-role-jogador.component.scss"],
})
export class EquipeInsertRoleJogadorComponent implements OnInit {
  equipes: Equipe[] = [];
  jogadores: Jogador[] = [];
  jogadoresAux: Jogador[] = [];
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
    this.jogadorService.listJogador().subscribe((resp) => {
      this.jogadores = resp.filter(v => v.id === Number(this.data.id));
    });
    
    this.form = this.fb.group({
      equipe: [null, [Validators.required]],
      jogador: [null, [Validators.required]]
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const data: any = this.form.value;
      console.log(data.jogador)
      this.equipeService
        .inserirJogador(data.equipe.id, data.jogador)
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
