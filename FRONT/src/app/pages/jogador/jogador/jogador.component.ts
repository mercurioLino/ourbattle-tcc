import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription, Subject, distinctUntilChanged, debounceTime, merge, startWith, switchMap, catchError, of, map } from 'rxjs';
import { Jogador } from 'src/app/models/jogador.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { JogadorDeleteComponent } from '../jogador-delete/jogador-delete.component';
import { JogadorService } from '../jogador.service';

@Component({
  selector: 'app-jogador',
  templateUrl: './jogador.component.html',
  styleUrls: ['./jogador.component.scss']
})
export class JogadorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoadingResults: boolean = true;
  data: Jogador[] = [];
  resultsLength: number = 0;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ["id", "nome", "pontuacao", "jogo", "actions"];
  form!: FormGroup;
  refresh: Subject<boolean> = new Subject();

  user: User | null = null;

  constructor(
    private readonly router: Router,
    private readonly jogadorService: JogadorService,
    private readonly authenticationService: AuthenticationService,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog
  ) {}

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
          return this.jogadorService
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

  navigateToJogadorCreate(): void {
    this.router.navigate(["jogador/create"]);
  }

  navigateToJogadorEditRoleJogador(): void {
    this.router.navigate(["jogador/edit-role-jogador"]);
  }

  checkRole(roles: string[]): boolean {
    return !!this.user && roles.indexOf(this.user.role) > -1;
  }

  openDeleteDialog(jogador: Jogador): void {
    const dialogRef = this.dialog.open(JogadorDeleteComponent, { data: jogador });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.jogadorService.delete(jogador.id as number).subscribe(() => {
          this.paginator.firstPage();
          this.refresh.next(true);
          this.jogadorService.showMessage("Jogador excluída com sucesso!");
        });
      }
    });
  }
}
