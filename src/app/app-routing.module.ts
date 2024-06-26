import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '',  redirectTo: 'userpage', pathMatch: 'full'},
  {path: 'home', loadChildren: () => import('./modules').then(m => m.HomeModule)},
  {path: 'userpage', loadChildren: () => import('./modules').then(m => m.UserPageModule)}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
