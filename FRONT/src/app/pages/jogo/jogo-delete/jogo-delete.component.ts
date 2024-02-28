import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Jogo } from "src/app/models/jogo.model";

@Component({
  selector: "app-jogo-delete",
  templateUrl: "./jogo-delete.component.html",
  styleUrls: ["./jogo-delete.component.scss"],
})
export class JogoDeleteComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Jogo) {}

  ngOnInit(): void {}
}
