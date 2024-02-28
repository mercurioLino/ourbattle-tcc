
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, map } from "rxjs";
import { Equipe } from "src/app/models/equipe.model";
import { ResponseDataList } from "src/app/models/shared";
import { Torneio } from "src/app/models/torneio.model";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class TorneioService {
  private baseApi: string = "/torneio";
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient
  ) {}

  list(
    page: number,
    limit: number,
    search?: string
  ): Observable<ResponseDataList<Torneio>> {
    let params = new HttpParams().set("page", page).set("limit", limit);

    if (search?.trim()) {
      params = params.set("search", search.trim());
    }

    return this.http.get<ResponseDataList<Torneio>>(
      environment.baseUrl + this.baseApi,
      { params }
    );
  }

  listTorneio(): Observable<Torneio[]> {
    const params = new HttpParams().set("limit", "99");

    return this.http
      .get<ResponseDataList<Torneio>>(environment.baseUrl + this.baseApi + '', {
        params,
      })
      .pipe(map((resp) => resp.items));
  }

  createTorneio(
    torneio: Torneio
  ): Observable<Torneio> {
    return this.http.post<Torneio>(
      environment.baseUrl + this.baseApi,
      torneio
    );
  }

  findById(id: number): Observable<Torneio> {
    return this.http.get<Torneio>(environment.baseUrl + this.baseApi + "/" + id);
  }

  update(id: number, equipe: Torneio): Observable<Torneio> {
    return this.http.patch<Torneio>(
      environment.baseUrl + this.baseApi + "/" + id,
      equipe
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      environment.baseUrl + this.baseApi + `/${id}`
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

  inserirEquipe(id:number, equipe: Equipe): Observable<Torneio> {
    return this.http.post<Torneio>(environment.baseUrl + this.baseApi + `/${id}` + "/add-equipe", equipe);
  }
}
