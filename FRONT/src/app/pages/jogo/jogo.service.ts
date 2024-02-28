import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { Jogo } from "src/app/models/jogo.model";
import { ResponseDataList } from "src/app/models/shared";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class JogoService {
  baseApi = "/jogo";

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  create(jogo: Jogo): Observable<Jogo> {
    return this.http.post<Jogo>(environment.baseUrl + this.baseApi, jogo);
  }

  findById(id: number): Observable<Jogo> {
    return this.http.get<Jogo>(environment.baseUrl + this.baseApi + "/" + id);
  }

  update(id: number, jogo: Jogo): Observable<Jogo> {
    return this.http.patch<Jogo>(
      environment.baseUrl + this.baseApi + "/" + id,
      jogo
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
  ): Observable<ResponseDataList<Jogo>> {
    let params = new HttpParams().set("page", page).set("limit", limit);

    if (search?.trim()) {
      params = params.set("search", search.trim());
    }

    return this.http.get<ResponseDataList<Jogo>>(
      environment.baseUrl + this.baseApi,
      { params }
    );
  }
  
  listJogo(): Observable<Jogo[]> {
    const params = new HttpParams().set("limit", "99");

    return this.http
      .get<ResponseDataList<Jogo>>(environment.baseUrl + this.baseApi, {
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
