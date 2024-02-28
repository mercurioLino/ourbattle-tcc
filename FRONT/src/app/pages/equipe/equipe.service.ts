import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Observable, map } from "rxjs";
import { Equipe } from "src/app/models/equipe.model";
import { Jogador } from "src/app/models/jogador.model";
import { ResponseDataList } from "src/app/models/shared";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class EquipeService {
  baseApi = "/equipe";

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  create(equipe: Equipe): Observable<Equipe> {
    return this.http.post<Equipe>(environment.baseUrl + this.baseApi, equipe);
  }

  inserirJogador(id:number, jogador: Jogador): Observable<Equipe> {
    return this.http.post<Equipe>(environment.baseUrl + this.baseApi + `/${id}` + "/add-jogador", jogador);
  }

  removerJogador(id:number, jogador: Jogador): Observable<Equipe> {
    return this.http.post<Equipe>(environment.baseUrl + this.baseApi + `/${id}` + "/remover-jogador", jogador);
  }

  findById(id: number): Observable<Equipe> {
    return this.http.get<Equipe>(environment.baseUrl + this.baseApi + "/" + id);
  }

  update(id: number, equipe: Equipe): Observable<Equipe> {
    return this.http.patch<Equipe>(
      environment.baseUrl + this.baseApi + "/" + id,
      equipe
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      environment.baseUrl + this.baseApi + `/${id}`
    );
  }

  list(
    page: number,
    limit: number,
    search?: string
  ): Observable<ResponseDataList<Equipe>> {
    let params = new HttpParams().set("page", page).set("limit", limit);

    if (search?.trim()) {
      params = params.set("search", search.trim());
    }

    return this.http.get<ResponseDataList<Equipe>>(
      environment.baseUrl + this.baseApi,
      { params }
    );
  }

  listEquipe(): Observable<Equipe[]> {
    const params = new HttpParams().set("limit", "99");

    return this.http
      .get<ResponseDataList<Equipe>>(environment.baseUrl + this.baseApi, {
        params,
      })
      .pipe(map((resp) => resp.items));
  }

  showMessage(msg: string, IsError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: IsError ? ["msg-error"] : ["msg-success"],
    });
  }
}
