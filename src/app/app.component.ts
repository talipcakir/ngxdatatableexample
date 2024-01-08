import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CustomModule} from "./modules/custom.module";
import {ComponentsModule} from "./components/components.module";
import {CacheService} from "./services/cache.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomModule, ComponentsModule],
  template:
    `
      <app-header></app-header>
      <app-datatable></app-datatable>
    `,
  styles: ``
})
export class AppComponent implements OnInit, OnDestroy {

  ilJsonPath = 'json/iller.json';
  ilceJsonPath = 'json/ilceler.json';

  protected subscriptions$: Subject<boolean> = new Subject();

  constructor(
    private readonly cacheService: CacheService,
  ) {
  }

  ngOnInit() {
    // this.cacheService.get()
    //   .pipe(takeUntil(this.subscriptions$))
    //   .subscribe((c) => {
    //     if (c && c?.length) {
    //       this.jsonService.getJson(this.ilceJsonPath)
    //         .pipe(takeUntil(this.subscriptions$))
    //         .subscribe(json => {
    //           this.cacheService.set(json);
    //         })
    //     }
    // });
  }

  ngOnDestroy() {
    this.subscriptions$.next(true);
    this.subscriptions$.complete();
  }
}
