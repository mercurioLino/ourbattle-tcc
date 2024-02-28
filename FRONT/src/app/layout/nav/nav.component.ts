import { Role, User } from './../../models/user.model';
import { AuthenticationService } from './../../shared/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  user: User | null = null;

  constructor(private readonly authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.authenticationService.getCurrentUserValue();

  }

  checkRole(roles: string[]): boolean{
    return !!this.user && (roles.indexOf(this.user.role) > -1);
  }

  logout(): void{
    this.authenticationService.logout()
  }
}
