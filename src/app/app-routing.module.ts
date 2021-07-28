import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'reservations',
        children: [
            {
                path: 'list',
                loadChildren: () => import('./pages/reservation/reservation-list/reservation-list.module').then((_) => _.ReservationListModule),
                data: {
                    name: 'Reservations List',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consectetur dolorem ipsam nam obcaecati, sunt. Accusamus aspernatur consequuntur!',
                    path: 'reservation-list'
                }
            },
            {
                path: 'create/:id',
                loadChildren: () => import('./pages/reservation/reservation-edit/reservation-edit.module').then((_) => _.ReservationEditModule),
                data: {
                    name: 'Create reservation',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, illo, molestias? Amet aperiam assumenda blanditiis deleniti doloribus, dolorum ducimus facilis fuga ipsum.',
                    path: 'reservation-create'
                }
            },
            {
                path: 'edit/:id',
                loadChildren: () => import('./pages/reservation/reservation-edit/reservation-edit.module').then((_) => _.ReservationEditModule),
                data: {
                    name: 'Edit reservation',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid beatae cupiditate delectus labore maxime mollitia.',
                    path: 'reservation-edit'
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
        path: 'clients',
        children: [
            {
                path: 'list',
                loadChildren: () => import('./pages/client/client-list/client-list.module').then((_) => _.ClientListModule),
                data: {
                    name: 'Client List',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consectetur dolorem ipsam nam obcaecati, sunt. Accusamus aspernatur consequuntur!',
                    path: 'client-list'
                }
            },
            {
                path: 'create',
                loadChildren: () => import('./pages/client/client-edit/client-edit.module').then((_) => _.ClientEditModule),
                data: {
                    name: 'Create Client',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consectetur dolorem ipsam nam obcaecati, sunt. Accusamus aspernatur consequuntur!',
                    path: 'client-create'
                }
            },
            {
                path: 'edit/:id',
                loadChildren: () => import('./pages/client/client-edit/client-edit.module').then((_) => _.ClientEditModule),
                data: {
                    name: 'Create Edit',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consectetur dolorem ipsam nam obcaecati, sunt. Accusamus aspernatur consequuntur!',
                    path: 'client-edit'
                }
            },
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
