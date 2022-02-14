import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'vendas',
    loadChildren: () => import('./page/vendas/vendas.module').then( m => m.VendasPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./page/clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'financeiro',
    loadChildren: () => import('./page/financeiro/financeiro.module').then( m => m.FinanceiroPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
