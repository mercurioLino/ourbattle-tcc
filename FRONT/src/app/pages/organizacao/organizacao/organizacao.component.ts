import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subject, Subscription, catchError, debounceTime, distinctUntilChanged, map, merge, of, startWith, switchMap } from 'rxjs';
import { Organizacao } from 'src/app/models/organizacao.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { OrganizacaoDeleteComponent } from '../organizacao-delete/organizacao-delete.component';
import { OrganizacaoService } from '../organizacao.service';
@Component({
  selector: 'app-organizacao',
  templateUrl: './organizacao.component.html',
  styleUrls: ['./organizacao.component.scss']
})
export class OrganizacaoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoadingResults: boolean = true;
  data: Organizacao[] = [];
  resultsLength: number = 0;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ["id", "nome", "email", "actions"];
  form!: FormGroup;
  refresh: Subject<boolean> = new Subject();

  user: User | null = null;

  constructor(
    private readonly router: Router,
    private readonly organizacaoService: OrganizacaoService,
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
          return this.organizacaoService
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

  navigateToOrganizacaoCreate(): void {
    this.router.navigate(["organizacao/create"]);
  }

  navigateToOrganizacaoEditRoleOrganizacao(): void {
    this.router.navigate(["organizacao/edit-role-organizacao"]);
  }

  checkRole(roles: string[]): boolean {
    return !!this.user && roles.indexOf(this.user.role) > -1;
  }

  openDeleteDialog(organizacao: Organizacao): void {
    const dialogRef = this.dialog.open(OrganizacaoDeleteComponent, { data: organizacao });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.organizacaoService.delete(organizacao.id as number).subscribe(() => {
          this.paginator.firstPage();
          this.refresh.next(true);
          this.organizacaoService.showMessage("Organizacao excluída com sucesso!");
        });
      }
    });
  }
}
