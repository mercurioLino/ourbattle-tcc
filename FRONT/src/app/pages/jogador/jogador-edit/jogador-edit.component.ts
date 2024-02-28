import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError } from "rxjs";
import { Jogador } from "src/app/models/jogador.model";
import { JogadorService } from "../jogador.service";

@Component({
  selector: "app-jogador-edit",
  templateUrl: "./jogador-edit.component.html",
  styleUrls: ["./jogador-edit.component.scss"],
})
export class JogadorEditComponent implements OnInit {
  id!: number;
  form: FormGroup = new FormGroup({});
  jogador!: Jogador;
  constructor(
    private readonly router: Router,
    private readonly jogadorService: JogadorService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id")!;

    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required]],
      nickname: [null, [Validators.required]],
    });

    this.jogadorService.findById(this.id).subscribe((resp) => {
      this.jogador = resp;
      this.form.patchValue(this.jogador);
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const jogador: Jogador = this.form.value;

      this.jogadorService
        .update(this.id, jogador)
        .pipe(
          catchError((err) => {
            this.jogadorService.showMessage("Erro ao alterar jogador", true);
            return err;
          })
        )

        .subscribe((resp) => {
          this.jogadorService.showMessage("Jogador atualizada com sucesso!");
          this.router.navigate(["jogador"]);
        });
    } else {
      this.jogadorService.showMessage("Dados incompletos", true);
    }
  }

  cancel(): void {
    this.router.navigate(["jogador"]);
  }
}
