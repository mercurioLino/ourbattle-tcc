import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Equipe } from "src/app/models/equipe.model";

@Component({
  selector: "app-equipe-delete",
  templateUrl: "./equipe-delete.component.html",
  styleUrls: ["./equipe-delete.component.scss"],
})
export class EquipeDeleteComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Equipe) {}

  ngOnInit(): void {}
}
