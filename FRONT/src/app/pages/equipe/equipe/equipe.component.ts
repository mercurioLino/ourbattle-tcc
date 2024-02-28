import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import {
  Subject,
  Subscription,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  of,
  startWith,
  switchMap,
} from "rxjs";
import { Equipe } from "src/app/models/equipe.model";
import { User } from "src/app/models/user.model";
import { AuthenticationService } from "src/app/shared/authentication.service";
import { EquipeDeleteComponent } from "../equipe-delete/equipe-delete.component";
import { EquipeService } from "../equipe.service";
@Component({
  selector: "app-equipe",
  templateUrl: "./equipe.component.html",
  styleUrls: ["./equipe.component.scss"],
})
export class EquipeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoadingResults: boolean = true;
  data: Equipe[] = [];
  resultsLength: number = 0;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ["id", "nome", "pontuacao", "actions"];
  form!: FormGroup;
  refresh: Subject<boolean> = new Subject();

  user: User | null = null;

  constructor(
    private readonly router: Router,
    private readonly equipeService: EquipeService,
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
          return this.equipeService
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

  navigateToEquipeCreate(): void {
    this.router.navigate(["equipe/create"]);
  }

  navigateToInserirJogadorEquipe(): void {
    this.router.navigate(["equipe/inserir-jogador"]);
  }

  navigateToRemoverJogadorEquipe(): void {
    this.router.navigate(["equipe/remover-jogador"]);
  }

  navigateToEditEquipeRoleJogador(): void {
    this.router.navigate(["equipe/edit-role-jogador"]);
  }

  navigateToInserirJogadorEquipeRoleJogador(): void {
    this.router.navigate(["equipe/inserir-jogador-role-jogador/"]);
  }

  checkRole(roles: string[]): boolean {
    return !!this.user && roles.indexOf(this.user.role) > -1;
  }

  openDeleteDialog(equipe: Equipe): void {
    const dialogRef = this.dialog.open(EquipeDeleteComponent, { data: equipe });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.equipeService.delete(equipe.id as number).subscribe(() => {
          this.paginator.firstPage();
          this.refresh.next(true);
          this.equipeService.showMessage("Equipe excluída com sucesso!");
        });
      }
    });
  }
}
