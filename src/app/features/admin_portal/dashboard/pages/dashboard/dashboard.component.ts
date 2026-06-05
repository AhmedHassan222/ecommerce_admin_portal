import { Component } from '@angular/core';
import { PaginationComponent } from '../../../../../shared/components/pagination/pagination.component';
import { BreadCrumbsComponent } from "../../../../../shared/components/bread-crumbs/bread-crumbs.component";

@Component({
  selector: 'app-dashboard',
  imports: [PaginationComponent, BreadCrumbsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  breadcrumbs = [
    {name: 'Home',link: ''},
    {name: 'Dashboard',link: '/dashboard'}
  ];
  currentPage = 1;
  changePage(page: number): void {
    this.currentPage = page;
  }
}
