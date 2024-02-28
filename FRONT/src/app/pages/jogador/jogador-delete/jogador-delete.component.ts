import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Jogador } from "src/app/models/jogador.model";

@Component({
  selector: "app-jogador-delete",
  templateUrl: "./jogador-delete.component.html",
  styleUrls: ["./jogador-delete.component.scss"],
})
export class JogadorDeleteComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Jogador) {}

  ngOnInit(): void {}
}
