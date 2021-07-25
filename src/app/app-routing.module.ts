import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'reservations',
    children: [
      {
        path: 'list',
        loadChildren: () => import('./pages/reservation/reservation-list/reservation-list.module').then((_) => _.ReservationListModule),
          name: 'Reservations List',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consectetur dolorem ipsam nam obcaecati, sunt. Accusamus aspernatur consequuntur!',
          path: 'list'
        }
      },
      {
        path: 'create',
        loadChildren: () => import('./pages/reservation/reservation-edit/reservation-edit.module').then((_) => _.ReservationEditModule),
        data: {
          name: 'Create reservation',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, illo, molestias? Amet aperiam assumenda blanditiis deleniti doloribus, dolorum ducimus facilis fuga ipsum.',
          path: 'create'
        }
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./pages/reservation/reservation-edit/reservation-edit.module').then((_) => _.ReservationEditModule),
        data: {
          name: 'Edit reservation',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid beatae cupiditate delectus labore maxime mollitia.',
          path: 'edit'
        }
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'reservations',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
