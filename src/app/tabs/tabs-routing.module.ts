import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from '../LoginPage/login.page';
import { HomePage } from '../HomePage/home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'LoginPage',
    pathMatch: 'full'  // Uygulama ilk açıldığında 'LoginPage'e yönlendirilecek
  },
  {
    path: 'LoginPage',
    component: LoginPage,
    loadChildren: () => import('../LoginPage/login.page.module').then(m => m.LoginPageModule)
  },
  {
    path: 'HomePage',
    component: HomePage,
    loadChildren: () => import('../HomePage/home.page.module').then(m => m.HomePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Kök yönlendirmeler için forRoot kullan
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
