import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError } from "rxjs";
import { Jogo } from "src/app/models/jogo.model";
import { JogoService } from "../jogo.service";

@Component({
  selector: "app-jogo-edit",
  templateUrl: "./jogo-edit.component.html",
  styleUrls: ["./jogo-edit.component.scss"],
})
export class JogoEditComponent implements OnInit {
  id!: number;
  form: FormGroup = new FormGroup({});
  jogo!: Jogo;
  constructor(
    private readonly router: Router,
    private readonly jogoService: JogoService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id")!;

    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      regras: [null, [Validators.required]],
    });

    this.jogoService.findById(this.id).subscribe((resp) => {
      this.jogo = resp;
      this.form.patchValue(this.jogo);
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const jogo: Jogo = this.form.value;

      this.jogoService
        .update(this.id, jogo)
        .pipe(
          catchError((err) => {
            this.jogoService.showMessage("Erro ao alterar jogo", true);
            return err;
          })
        )

        .subscribe((resp) => {
          this.jogoService.showMessage("Jogo atualizada com sucesso!");
          this.router.navigate(["jogo"]);
        });
    } else {
      this.jogoService.showMessage("Dados incompletos", true);
    }
  }

  cancel(): void {
    this.router.navigate(["jogo"]);
  }
}
