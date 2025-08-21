import { Routes } from '@angular/router';
import { Home } from '../components/home/home';
import { Product } from '../components/product/product';
import { Service } from '../components/service/service';
import { Pricing } from '../components/pricing/pricing';
import { Contact } from '../components/contact/contact';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'product',
        pathMatch: 'full',
    },
    {
        path: '',
        component: Home,
        children: [
            {
                path: 'product',
                component: Product
            },
            {
                path: 'service',
                component: Service
            },
            {
                path: 'pricing',
                component: Pricing
            },
            {
                path: 'contact',
                component: Contact
            }
        ]
    },
];
