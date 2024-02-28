
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, map, merge, of, startWith, Subject, Subscription, switchMap } from 'rxjs';
import { Torneio } from 'src/app/models/torneio.model';
import { User } from 'src/app/models/user.model';
import { TorneioDeleteComponent } from '../torneio-delete/torneio-delete.component';
import { TorneioService } from '../torneio.service';
import { AuthenticationService } from './../../../shared/authentication.service';

@Component({
  selector: 'app-torneios',
  templateUrl: './torneio.component.html',
  styleUrls: ['./torneio.component.scss']
})
export class TorneiosComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoadingResults: boolean = true;
  data: Torneio[] = [];
  resultsLength: number = 0;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ["id", "nome", "jogo","organizacao", "data",  "actions"];
  form!: FormGroup;
  refresh: Subject<boolean> = new Subject();

  user: User | null = null;

  constructor(private readonly router:Router,
    private readonly torneioService: TorneioService,
    private readonly authenticationService: AuthenticationService,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog
    ) { }

  ngOnInit() {

    this.user = this.authenticationService.getCurrentUserValue();
    this.form = this.fb.group({
      search: [],
    });

    const sub = this.form
      .get("search")!
      .valueChanges.pipe(distinctUntilChanged(), debounceTime(200))
      .subscribe(() => {
        this.paginator.firstPage();
        this.refresh.next(true);
      });

    this.subscriptions.push(sub);
  }

  ngAfterViewInit(): void {
    const sub = merge(this.refresh, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const search = this.form.get("search")?.value;
          return this.torneioService
            .list(this.paginator.pageIndex + 1, this.paginator.pageSize, search)
            .pipe(catchError(() => of(null)));
        }),
        map((data) => {
          this.isLoadingResults = false;
          if (data) {
            this.resultsLength = data.meta.totalItems;
            return data.items;
          }
          return [];
        })
      )
      .subscribe((data) => (this.data = data));
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  checkRole(roles: string[]): boolean {
    return !!this.user && roles.indexOf(this.user.role) > -1;
  }

  openDeleteDialog(torneio: Torneio): void {
    const dialogRef = this.dialog.open(TorneioDeleteComponent, { data: torneio });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.torneioService.delete(torneio.id as number).subscribe(() => {
          this.paginator.firstPage();
          this.refresh.next(true);
          this.torneioService.showMessage("Torneio excluído com sucesso!");
        });
      }
    });
  }

  navigateToTorneioCreate(): void {
    this.router.navigate(['torneio/create']);
  }

  navigateToTorneioRoleOrganizacaoCreate(): void {
    this.router.navigate(['torneio/create-role-organizacao']);
  }

  navigateToTorneioRoleOrganizacaoEdit(): void {
    this.router.navigate(['torneio/edit-role-organizacao']);
  }

  navigateToInsertJogadorTorneio(): void {
    this.router.navigate(['torneio/inserir-jogador']);
  }

  navigateToInsertEquipeTorneio(): void {
    this.router.navigate(['torneio/inserir-equipe']);
  }

  navigateToInsertJogadorTorneioRoleJogador(): void {
    this.router.navigate(['torneio/inserir-jogador-role-jogador']);
  }

  navigateToInsertEquipeTorneioRoleJogador(): void {
    this.router.navigate(['torneio/inserir-equipe-role-jogador']);
  }
}
