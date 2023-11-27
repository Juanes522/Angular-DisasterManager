import { Routes } from '@angular/router';

import { StartComponent } from './start/start.component';
import { RegisterComponent } from './register/register.component';
import { UsertableComponent } from './usertable/usertable.component';
import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { AdmincontrolComponent } from './admincontrol/admincontrol.component';
import { RegisterinvestigatorComponent } from './registerinvestigator/registerinvestigator.component';

import { HeaderComponent } from './header/header.component'; 

export const Approutes: Routes = [
    {
        path: '',
        component: HeaderComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: StartComponent
            },
            {
                path: 'start',
                title: 'Disaster Manager',
                component: StartComponent
            },
            {
                path: 'register',
                title: 'Register Disaster',
                component: RegisterComponent
            },
            {
                path: 'list',
                title: 'Disasters List',
                component: UsertableComponent
            },
            {
                path: 'login',
                title: 'Log In',
                component: LoginadminComponent
            },
            {
                path: 'admincontrol',
                title: 'Admin Control',
                component: AdmincontrolComponent,
            },
            {
                path: 'registerinvestigator',
                title: 'Register Investigator',
                component: RegisterinvestigatorComponent
            },
            {
                path: '**',
                redirectTo: 'start',
                pathMatch: 'full'
            }
        ]
    }
]