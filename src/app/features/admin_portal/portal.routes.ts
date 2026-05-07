import { Routes } from "@angular/router";
import { PROJECT_PAGES } from "../../shared/pages/project-pages.model";

export const portalRoutes: Routes = [
    {
        path: '', loadComponent: () => import('../../core/components/layout/layout.component').then((m) => m.LayoutComponent),
        children: [
            { path: '', redirectTo: PROJECT_PAGES.dashboard.base, pathMatch: 'full' },
            { path: PROJECT_PAGES.dashboard.base, loadComponent: () => import('./dashboard/pages/dashboard/dashboard.component').then((m) => m.DashboardComponent) }
        ]
    }
]