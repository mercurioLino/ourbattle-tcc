import { InterceptorSkipHeader } from './../interceptors/jwt-auth.interceptor';
import { LoginData, User } from './../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Jogador } from '../models/jogador.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService { 

  private baseApi: string = '/auth';
  public currentUser: Observable<User | null>;
  private currentUserSubject: BehaviorSubject<User | null>;
  private propertyName: string = 'currentUser';
  private tokenExpiryTime: number = 3600;

  constructor(
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getUserStorage(false));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  logout(): void{
    this.storageService.remove(this.propertyName);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  login(email: string, password: string): Observable<User | null>{
    let headers = new HttpHeaders().set(InterceptorSkipHeader, '');
    return this.http
    .post<LoginData>(environment.baseUrl + this.baseApi + '/login', {
      email, 
      password
    }, {headers}).pipe(
      switchMap((dataAuth) => {
        if(dataAuth?.access_token){
          headers = headers.set(
            'Authorization', `${dataAuth.token_type} ${dataAuth.access_token}`
          )
          return this.http.get<User>(
            environment.baseUrl + this.baseApi + '/user', 
            {headers}
          ).pipe(
            map((user) => {
              user = {...user, ...dataAuth};
              this.storageService.set(this.propertyName, user, this.tokenExpiryTime);
              this.currentUserSubject.next(user);
              return user;
            })
          )
        } else {
          return of(null)
        }
      })
    );
  }

  isLoggedIn(): boolean{
    const user = this.getUserStorage(false);
    return !!(user && user.access_token !== null);
  }

  validateTokenExpirationTime(): void{
    if(this.storageService.isExpired(this.propertyName)){
      this.logout();
    }
  }

  getCurrentUserValue(): User | null{
    return this.currentUserSubject.value;
  }
  
  private getUserStorage(isRediret: boolean = true){
    let user: User | null = null;
    try{
      user = this.storageService.get(this.propertyName);
    } catch(error){
      this.logout()
      if(isRediret) {
        this.router.navigate(['/login']);
      }
    }
    return user;
  }
}
