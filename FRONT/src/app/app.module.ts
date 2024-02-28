import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RedDirective } from './directives/red.directive';
import { JsonDateInterceptor } from './interceptors/json-date.interceptor';
import { JwtAuthInterceptor } from './interceptors/jwt-auth.interceptor';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavComponent } from './layout/nav/nav.component';
import { PageComponent } from './layout/page/page.component';
import { EquipeCreateComponent } from './pages/equipe/equipe-create/equipe-create.component';
import { EquipeDeleteComponent } from './pages/equipe/equipe-delete/equipe-delete.component';
import { EquipeEditRoleJogadorComponent } from './pages/equipe/equipe-edit-role-jogador/equipe-edit-role-jogador.component';
import { EquipeEditComponent } from './pages/equipe/equipe-edit/equipe-edit.component';
import { EquipeInsertRoleJogadorComponent } from './pages/equipe/equipe-insert-role-jogador/equipe-insert-role-jogador.component';
import { EquipeInsertComponent } from './pages/equipe/equipe-insert/equipe-insert.component';
import { EquipeRemoveComponent } from './pages/equipe/equipe-remove/equipe-remove.component';
import { EquipeComponent } from './pages/equipe/equipe/equipe.component';
import { HomeComponent } from './pages/home/home.component';
import { JogadorCreateOpenComponent } from './pages/jogador/jogador-create-open/jogador-create-open.component';
import { JogadorCreateComponent } from './pages/jogador/jogador-create/jogador-create.component';
import { JogadorDeleteComponent } from './pages/jogador/jogador-delete/jogador-delete.component';
import { JogadorEditRoleJogadorComponent } from './pages/jogador/jogador-edit-role-jogador/jogador-edit-role-jogador.component';
import { JogadorEditComponent } from './pages/jogador/jogador-edit/jogador-edit.component';
import { JogadorComponent } from './pages/jogador/jogador/jogador.component';
import { JogoCreateComponent } from './pages/jogo/jogo-create/jogo-create.component';
import { JogoDeleteComponent } from './pages/jogo/jogo-delete/jogo-delete.component';
import { JogoEditComponent } from './pages/jogo/jogo-edit/jogo-edit.component';
import { JogoComponent } from './pages/jogo/jogo/jogo.component';
import { LoginComponent } from './pages/login/login.component';
import { OrganizacaoCreateComponent } from './pages/organizacao/organizacao-create/organizacao-create.component';
import { OrganizacaoDeleteComponent } from './pages/organizacao/organizacao-delete/organizacao-delete.component';
import { OrganizacaoEditRoleOrganizacaoComponent } from './pages/organizacao/organizacao-edit-role-organizacao/organizacao-edit-role-organizacao.component';
import { OrganizacaoEditComponent } from './pages/organizacao/organizacao-edit/organizacao-edit.component';
import { OrganizacaoComponent } from './pages/organizacao/organizacao/organizacao.component';
import { TorneioCreateRoleOrganizacaoComponent } from './pages/torneio/torneio-create-role-organizacao/torneio-create-role-organizacao.component';
import { TorneioCreateComponent } from './pages/torneio/torneio-create/torneio-create.component';
import { TorneioDeleteComponent } from './pages/torneio/torneio-delete/torneio-delete.component';
import { TorneioEditRoleOrganizacaoComponent } from './pages/torneio/torneio-edit-role-organizacao/torneio-edit-role-organizacao.component';
import { TorneioEditComponent } from './pages/torneio/torneio-edit/torneio-edit.component';
import { TorneioInsertEquipeRoleJogadorComponent } from './pages/torneio/torneio-insert-equipe-role-jogador/torneio-insert-equipe-role-jogador.component';
import { TorneioInsertEquipeComponent } from './pages/torneio/torneio-insert-equipe/torneio-insert-equipe.component';
import { TorneiosComponent } from './pages/torneio/torneio/torneio.component';
import { PartidaComponent } from './pages/partida/partida.component';

@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent, 
    FooterComponent,
    RedDirective, 
    JogadorComponent, 
    JogadorCreateComponent,
    NavComponent, 
    HomeComponent, 
    EquipeComponent, 
    EquipeCreateComponent,
    OrganizacaoComponent, 
    OrganizacaoCreateComponent, 
    TorneiosComponent, 
    TorneioCreateComponent, 
    JogoComponent,
    JogoCreateComponent,
    PageComponent, 
    LoginComponent, 
    EquipeEditComponent, 
    EquipeDeleteComponent, 
    TorneioEditComponent, 
    TorneioDeleteComponent, 
    JogadorEditComponent, 
    JogadorDeleteComponent, 
    JogoEditComponent, 
    JogoDeleteComponent, 
    OrganizacaoEditComponent, 
    OrganizacaoDeleteComponent, 
    EquipeInsertComponent, 
    TorneioInsertEquipeComponent, 
    EquipeInsertRoleJogadorComponent, 
    TorneioInsertEquipeRoleJogadorComponent, 
    JogadorEditRoleJogadorComponent, 
    EquipeEditRoleJogadorComponent, 
    JogadorCreateOpenComponent,
    TorneioEditRoleOrganizacaoComponent, 
    TorneioCreateRoleOrganizacaoComponent, 
    OrganizacaoEditRoleOrganizacaoComponent, 
    EquipeRemoveComponent, PartidaComponent,
  ],
  imports: [
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: JsonDateInterceptor, multi: true},
    { provide: LOCALE_ID, useValue: 'pt-BR'},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
