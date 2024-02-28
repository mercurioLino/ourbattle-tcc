import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Torneio } from "src/app/models/torneio.model";

@Component({
  selector: "app-torneio-delete",
  templateUrl: "./torneio-delete.component.html",
  styleUrls: ["./torneio-delete.component.scss"],
})
export class TorneioDeleteComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Torneio) {}

  ngOnInit(): void {}
}
