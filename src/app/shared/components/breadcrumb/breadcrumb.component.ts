import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { filter, Observable } from 'rxjs';
import { AppUser } from 'src/app/models/app-user';
import { Translation } from '../../models/translation';
import { LocalizationService } from '../../services/localization.service';
import { MavAuthService } from '../../services/mav-auth.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, AfterViewInit {

  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  readonly home = { icon: 'pi pi-home', url: '/' };
  menuItems!: MenuItem[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localizationService: LocalizationService,
    private cdRef: ChangeDetectorRef,
    private authService: MavAuthService,
  ) { }

  currentUser$!: Observable<AppUser | null>;

  translatorList: Translation[] = [];
  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.currentUser$ = this.authService.currentUser$;
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.localizationService.translation$.subscribe((val) => {
          if (val && val.length > 0) {
            this.translatorList = val;
            this.menuItems = this.createBreadcrumbs(this.activatedRoute.root);
          }
        })
      });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      let label = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB];
      if (label && label !== 'Dashboard.ControllerTitle') {
        label = this.translatorList.some(x => x.keyName == label) ? this.translatorList.find(x => x.keyName == label)?.translation : label;
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return [];
  }

}
