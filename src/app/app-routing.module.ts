import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquilibreComponent } from './client/equilibre/equilibre.component';
import { AccueilComponent } from './client/accueil/accueil.component';
import { DemandeComponent } from './client/demande/demande.component';
import { AboutComponent } from './client/about/about.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminComponent } from './admin/admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DemandesComponent } from './admin/demandes/demandes.component';
import { MessagesComponent } from './admin/messages/messages.component';
import { TraitementComponent } from './admin/traitement/traitement.component';
import { ContactComponent } from './client/contact/contact.component';

const routes: Routes = [
  {path:'', redirectTo:'equilibre', pathMatch:'full'},
  {path:'equilibre', component: EquilibreComponent,
    children:[
       {path:'', redirectTo:'accueil', pathMatch:'full'},
       {path:'accueil', component: AccueilComponent},
       {path:'faire-une-demande', component: DemandeComponent},
       {path:'a-propos', component: AboutComponent},
       {path:'contact', component: ContactComponent}
    ]
  },
  {path:'login', component: LoginComponent},
  {path:'admin', component: AdminComponent, 
    children:[
      {path:'', redirectTo:'dashboard', pathMatch:'full'},
      {path:'dashboard', component: DashboardComponent},
      {path:'demandes', component: DemandesComponent},
      {path:'messages', component: MessagesComponent},
      {path:'traitement', component: TraitementComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
