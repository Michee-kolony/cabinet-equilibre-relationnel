import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquilibreComponent } from './client/equilibre/equilibre.component';
import { AccueilComponent } from './client/accueil/accueil.component';
import { DemandeComponent } from './client/demande/demande.component';
import { AboutComponent } from './client/about/about.component';

const routes: Routes = [
  {path:'', redirectTo:'equilibre', pathMatch:'full'},
  {path:'equilibre', component: EquilibreComponent,
    children:[
       {path:'', redirectTo:'accueil', pathMatch:'full'},
       {path:'accueil', component: AccueilComponent},
       {path:'faire-une-demande', component: DemandeComponent},
       {path:'a-propos', component: AboutComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
