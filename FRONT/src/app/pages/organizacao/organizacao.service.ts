import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";
import { hasUncaughtExceptionCaptureCallback } from 'process';
import { catchError, map, Observable } from 'rxjs';
import { Organizacao } from 'src/app/models/organizacao.model';
import { ResponseDataList } from 'src/app/models/shared';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class OrganizacaoService {

  baseApi = "/organizacao";

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  create(organizacao: Organizacao): Observable<Organizacao> {
    return this.http.post<Organizacao>(environment.baseUrl + this.baseApi, organizacao);
  }

  findById(id: number): Observable<Organizacao> {
    return this.http.get<Organizacao>(environment.baseUrl + this.baseApi + "/" + id);
  }

  update(id: number, organizacao: Organizacao): Observable<Organizacao> {
    return this.http.patch<Organizacao>(
      environment.baseUrl + this.baseApi + "/" + id,
      organizacao
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
  ): Observable<ResponseDataList<Organizacao>> {
    let params = new HttpParams().set("page", page).set("limit", limit);

    if (search?.trim()) {
      params = params.set("search", search.trim());
    }

    return this.http.get<ResponseDataList<Organizacao>>(
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


  listOrganizacao(): Observable<Organizacao[]> {
    const params = new HttpParams().set("limit", "99");

    return this.http
      .get<ResponseDataList<Organizacao>>(environment.baseUrl + this.baseApi, {
        params,
      })
      .pipe(map((resp) => resp.items));
  }
}
