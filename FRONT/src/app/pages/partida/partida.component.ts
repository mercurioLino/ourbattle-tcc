import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { Subject, Subscription, catchError, debounceTime, distinctUntilChanged, map, merge, of, startWith, switchMap } from "rxjs";
import { Partida } from "src/app/models/partida.model";
import { User } from "src/app/models/user.model";
import { AuthenticationService } from "src/app/shared/authentication.service";
import { PartidaService } from "./partida.service";

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.scss']
})
export class PartidaComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoadingResults: boolean = true;
  data: Partida[] = [];
  resultsLength: number = 0;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ["id"];
  form!: FormGroup;
  refresh: Subject<boolean> = new Subject();

  user: User | null = null;

  constructor(
    private readonly router: Router,
    private readonly partidaService: PartidaService,
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
          return this.partidaService
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

  // openDeleteDialog(partida: Partida): void {
  //   const dialogRef = this.dialog.open(PartidaDeleteComponent, { data: partida });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.partidaService.delete(partida.id as number).subscribe(() => {
  //         this.paginator.firstPage();
  //         this.refresh.next(true);
  //         this.partidaService.showMessage("Partida excluída com sucesso!");
  //       });
  //     }
  //   });
  // }

}
