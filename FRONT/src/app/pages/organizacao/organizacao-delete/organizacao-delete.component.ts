import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Organizacao } from "src/app/models/organizacao.model";
@Component({
  selector: 'app-organizacao-delete',
  templateUrl: './organizacao-delete.component.html',
  styleUrls: ['./organizacao-delete.component.scss']
})
export class OrganizacaoDeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Organizacao) {}

  ngOnInit(): void {}
}

