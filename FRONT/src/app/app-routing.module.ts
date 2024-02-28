import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';
import { RoleGuard } from './guards/role.guard';
import { PageComponent } from './layout/page/page.component';
import { Role } from './models/user.model';
import { EquipeCreateComponent } from './pages/equipe/equipe-create/equipe-create.component';
import { EquipeEditRoleJogadorComponent } from './pages/equipe/equipe-edit-role-jogador/equipe-edit-role-jogador.component';
import { EquipeEditComponent } from './pages/equipe/equipe-edit/equipe-edit.component';
import { EquipeInsertRoleJogadorComponent } from './pages/equipe/equipe-insert-role-jogador/equipe-insert-role-jogador.component';
import { EquipeInsertComponent } from './pages/equipe/equipe-insert/equipe-insert.component';
import { EquipeRemoveComponent } from './pages/equipe/equipe-remove/equipe-remove.component';
import { EquipeComponent } from './pages/equipe/equipe/equipe.component';
import { HomeComponent } from './pages/home/home.component';
import { JogadorCreateOpenComponent } from './pages/jogador/jogador-create-open/jogador-create-open.component';
import { JogadorCreateComponent } from './pages/jogador/jogador-create/jogador-create.component';
import { JogadorEditRoleJogadorComponent } from './pages/jogador/jogador-edit-role-jogador/jogador-edit-role-jogador.component';
import { JogadorEditComponent } from './pages/jogador/jogador-edit/jogador-edit.component';
import { JogadorComponent } from './pages/jogador/jogador/jogador.component';
import { JogoCreateComponent } from './pages/jogo/jogo-create/jogo-create.component';
import { JogoEditComponent } from './pages/jogo/jogo-edit/jogo-edit.component';
import { JogoComponent } from './pages/jogo/jogo/jogo.component';
import { LoginComponent } from './pages/login/login.component';
import { OrganizacaoCreateComponent } from './pages/organizacao/organizacao-create/organizacao-create.component';
import { OrganizacaoEditRoleOrganizacaoComponent } from './pages/organizacao/organizacao-edit-role-organizacao/organizacao-edit-role-organizacao.component';
import { OrganizacaoEditComponent } from './pages/organizacao/organizacao-edit/organizacao-edit.component';
import { OrganizacaoComponent } from './pages/organizacao/organizacao/organizacao.component';
import { PartidaComponent } from './pages/partida/partida.component';
import { TorneioCreateRoleOrganizacaoComponent } from './pages/torneio/torneio-create-role-organizacao/torneio-create-role-organizacao.component';
import { TorneioCreateComponent } from './pages/torneio/torneio-create/torneio-create.component';
import { TorneioEditRoleOrganizacaoComponent } from './pages/torneio/torneio-edit-role-organizacao/torneio-edit-role-organizacao.component';
import { TorneioEditComponent } from './pages/torneio/torneio-edit/torneio-edit.component';
import { TorneioInsertEquipeRoleJogadorComponent } from './pages/torneio/torneio-insert-equipe-role-jogador/torneio-insert-equipe-role-jogador.component';
import { TorneioInsertEquipeComponent } from './pages/torneio/torneio-insert-equipe/torneio-insert-equipe.component';
import { TorneiosComponent } from './pages/torneio/torneio/torneio.component';
const routes: Routes = [
  
  {path: 'jogador/register', component: JogadorCreateOpenComponent},
  {path:'login', component: LoginComponent},
  {path: '', 
  component: PageComponent,
  canActivate: [AuthenticationGuard],
  canActivateChild: [AuthenticationGuard],
  children: [
    {path:'', component: HomeComponent},
    {path: 'equipe',
    children
    : [
        {path: '', component: EquipeComponent},
        {path:'create', component: EquipeCreateComponent,canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Jogador]}},
        {path: ':id/edit', component: EquipeEditComponent, canActivate: [RoleGuard], data: {role: [Role.Admin]}},
        {path:'edit-role-jogador', component: EquipeEditRoleJogadorComponent,canActivate: [RoleGuard], data: {role: [Role.Jogador]}},
        {path:'inserir-jogador', component: EquipeInsertComponent, canActivate: [RoleGuard], data: {role: [Role.Admin]}},
        {path:'inserir-jogador-role-jogador', component: EquipeInsertRoleJogadorComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Jogador]}},
        {path:'remover-jogador', component: EquipeRemoveComponent, canActivate: [RoleGuard], data: {role: [Role.Admin]}},
    ]},
  
    {path: 'jogador',  children
    :[
      {path: '', component: JogadorComponent},
      {path: 'create', component: JogadorCreateComponent},
      {path: ':id/edit', component: JogadorEditComponent, canActivate: [RoleGuard], data: {role: [Role.Admin]}},
      {path: 'edit-role-jogador', component: JogadorEditRoleJogadorComponent, canActivate: [RoleGuard], data: {role: [Role.Jogador]}},
    ]},
  
    {path: 'jogo',  children
    :[
      {path: '', component: JogoComponent},
      {path: 'create', component: JogoCreateComponent, canActivate: [RoleGuard], data: {role: [Role.Admin]}},
      {path: ':id/edit', component: JogoEditComponent, canActivate: [RoleGuard], data: {role: [Role.Admin]}},
    ]},

    {path: 'torneio',  children
    :[
      {path: '', component: TorneiosComponent},
      {path: 'create', component: TorneioCreateComponent, canActivate: [RoleGuard], data: {role: [Role.Admin]}},
      {path: 'create-role-organizacao', component: TorneioCreateRoleOrganizacaoComponent, canActivate: [RoleGuard], data: {role: [Role.Organizacao]}},
      {path: ':id/edit', component: TorneioEditComponent, canActivate: [RoleGuard], data: {role: [Role.Admin]}},
      {path: 'edit-role-organizacao', component: TorneioEditRoleOrganizacaoComponent, canActivate: [RoleGuard], data: {role: [Role.Organizacao]}},
      {path:'inserir-equipe', component: TorneioInsertEquipeComponent,canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Organizacao]}},
      {path:'inserir-equipe-role-jogador', component: TorneioInsertEquipeRoleJogadorComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Jogador]}},
    ]},
    
    {path: 'partida', children
    : [
        {path: '', component: PartidaComponent},
    ]},
  
    {path: 'organizacao', children
    : [
        {path: '', component: OrganizacaoComponent},
        {path:'create', component: OrganizacaoCreateComponent, canActivate: [RoleGuard], data: {role: [Role.Admin]}},
        {path: ':id/edit', component: OrganizacaoEditComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Organizacao]}},
        {path: 'edit-role-organizacao', component: OrganizacaoEditRoleOrganizacaoComponent, canActivate: [RoleGuard], data: {role: [Role.Organizacao]}},
    ]},

  ]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
