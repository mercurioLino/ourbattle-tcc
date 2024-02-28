import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError } from "rxjs";
import { Equipe } from "src/app/models/equipe.model";
import { EquipeService } from "../equipe.service";

@Component({
  selector: "app-equipe-edit",
  templateUrl: "./equipe-edit.component.html",
  styleUrls: ["./equipe-edit.component.scss"],
})
export class EquipeEditComponent implements OnInit {
  id!: number;
  form: FormGroup = new FormGroup({});
  equipe!: Equipe;
  constructor(
    private readonly router: Router,
    private readonly equipeService: EquipeService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id")!;

    this.form = this.fb.group({
      nome: [null, [Validators.required]],
    });

    this.equipeService.findById(this.id).subscribe((resp) => {
      this.equipe = resp;
      this.form.patchValue(this.equipe);
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const equipe: Equipe = this.form.value;

      this.equipeService
        .update(this.id, equipe)
        .pipe(
          catchError((err) => {
            this.equipeService.showMessage("Erro ao alterar equipe", true);
            return err;
          })
        )

        .subscribe((resp) => {
          this.equipeService.showMessage("Equipe atualizada com sucesso!");
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
