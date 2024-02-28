import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError } from "rxjs";
import { Torneio } from "src/app/models/torneio.model";
import { TorneioService } from "../torneio.service";

@Component({
  selector: "app-torneio-edit",
  templateUrl: "./torneio-edit.component.html",
  styleUrls: ["./torneio-edit.component.scss"],
})
export class TorneioEditComponent implements OnInit {
  id!: number;
  form: FormGroup = new FormGroup({});
  torneio!: Torneio;
  constructor(
    private readonly router: Router,
    private readonly torneioService: TorneioService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id")!;

    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      data: [null, [Validators.required]],
      hora: [null, [Validators.required]],
      regras: [null, [Validators.required]],
      premiacao: [null, [Validators.required]]
    });

    this.torneioService.findById(this.id).subscribe((resp) => {
      this.torneio = resp;
      this.form.patchValue(this.torneio);
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const torneio: Torneio = this.form.value;

      this.torneioService
        .update(this.id, torneio)
        .pipe(
          catchError((err) => {
            this.torneioService.showMessage("Erro ao alterar torneio", true);
            return err;
          })
        )

        .subscribe((resp) => {
          this.torneioService.showMessage("Torneio atualizada com sucesso!");
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
