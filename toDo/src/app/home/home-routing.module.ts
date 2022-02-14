import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [

          {
            path: 'vendas',
            loadChildren: () => import('../page/vendas/vendas.module').then(m => m.VendasPageModule )
          },
          {
            path: 'clientes',
            loadChildren: () => import('../page/clientes/clientes.module').then(m => m.ClientesPageModule )
          },
          {
            path: 'financeiro',
            loadChildren: () => import('../page/financeiro/financeiro.module').then(m => m.FinanceiroPageModule )
          }
        ]
      }
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
