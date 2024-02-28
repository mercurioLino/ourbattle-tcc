import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, catchError, map } from 'rxjs';
import { Partida } from 'src/app/models/partida.model';
import { ResponseDataList } from 'src/app/models/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {


  baseApi = "/partida";

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  create(partida: Partida): Observable<Partida> {
    return this.http.post<Partida>(environment.baseUrl + this.baseApi, partida);
  }

  findById(id: number): Observable<Partida> {
    return this.http.get<Partida>(environment.baseUrl + this.baseApi + "/" + id);
  }

  update(id: number, partida: Partida): Observable<Partida> {
    return this.http.patch<Partida>(
      environment.baseUrl + this.baseApi + "/" + id,
      partida
    );
  }

  delete(id: number): Observable<boolean | unknown> {
    return this.http.delete<boolean>(
      environment.baseUrl + this.baseApi + `/${id}`
    ).pipe(
      catchError((err) =>{
        this.showMessage('Essa organização possuí dependências internas, portanto não pode ser excluída.\nRecomenda-se alterar seu status para Inativa.', true);
        return err;
      })
    )
  }

  list(
    page: number,
    limit: number,
    search?: string
  ): Observable<ResponseDataList<Partida>> {
    let params = new HttpParams().set("page", page).set("limit", limit);

    if (search?.trim()) {
      params = params.set("search", search.trim());
    }

    return this.http.get<ResponseDataList<Partida>>(
      environment.baseUrl + this.baseApi,
      { params }
    );
  }

  showMessage(msg: string, IsError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: IsError ? ["msg-error"] : ["msg-success"],
    });
  }


  listPartida(): Observable<Partida[]> {
    const params = new HttpParams().set("limit", "99");

    return this.http
      .get<ResponseDataList<Partida>>(environment.baseUrl + this.baseApi, {
        params,
      })
      .pipe(map((resp) => resp.items));
  }
}
