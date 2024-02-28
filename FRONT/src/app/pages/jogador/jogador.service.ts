import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, map } from "rxjs";
import { Jogador } from "src/app/models/jogador.model";
import { ResponseDataList } from "src/app/models/shared";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class JogadorService {
  private baseApi: string = "/jogador";
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient
  ) {}

  create(jogador: Jogador): Observable<Jogador> {
    return this.http.post<Jogador>(environment.baseUrl + this.baseApi, jogador);
  }

  findById(id: number): Observable<Jogador>{
    return this.http.get<Jogador>(
      environment.baseUrl + this.baseApi + "/" + id
    );
  }

  update(id: number, jogador: Jogador): Observable<Jogador> {
    return this.http.patch<Jogador>(
      environment.baseUrl + this.baseApi + "/" + id,
      jogador
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
  ): Observable<ResponseDataList<Jogador>> {
    let params = new HttpParams().set("page", page).set("limit", limit);

    if (search?.trim()) {
      params = params.set("search", search.trim());
    }

    return this.http.get<ResponseDataList<Jogador>>(
      environment.baseUrl + this.baseApi,
      { params }
    );
  }

  listJogador(): Observable<Jogador[]> {
    const params = new HttpParams().set("limit", "99");

    return this.http
      .get<ResponseDataList<Jogador>>(environment.baseUrl + this.baseApi, {
        params,
      })
      .pipe(map((resp) => resp.items));
  }

  listJogadorPorEquipe(): Observable<Jogador[]> {
    const params = new HttpParams().set("limit", "99");

    return this.http
      .get<ResponseDataList<Jogador>>(environment.baseUrl + this.baseApi, {
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
