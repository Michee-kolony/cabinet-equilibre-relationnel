import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EquilibreComponent } from './client/equilibre/equilibre.component';
import { AccueilComponent } from './client/accueil/accueil.component';
import { NavbarComponent } from './client/navbar/navbar.component';
import { FooterComponent } from './client/footer/footer.component';
import { DemandeComponent } from './client/demande/demande.component';
import { AboutComponent } from './client/about/about.component';
import { CookieConsentComponent } from './cookie-consent/cookie-consent.component';
import { FaqComponent } from './client/faq/faq.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminComponent } from './admin/admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DemandesComponent } from './admin/demandes/demandes.component';
import { MessagesComponent } from './admin/messages/messages.component';
import {FormsModule} from '@angular/forms';
import { TraitementComponent } from './admin/traitement/traitement.component';
import { ContactComponent } from './client/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { InfoComponent } from './admin/info/info.component';
import { ActualitesComponent } from './client/actualites/actualites.component';
import { LectureComponent } from './client/lecture/lecture.component';
import { PublierComponent } from './admin/publier/publier.component';
import { GestionadminComponent } from './admin/gestionadmin/gestionadmin.component';
import { LireComponent } from './admin/lire/lire.component';
import { ConditionsComponent } from './client/conditions/conditions.component';
import { ConfidentialiteComponent } from './client/confidentialite/confidentialite.component';
import { SecuriteComponent } from './client/securite/securite.component';
import { CentreComponent } from './client/centre/centre.component'; // <-- Import important !

@NgModule({
  declarations: [
    AppComponent,
    EquilibreComponent,
    AccueilComponent,
    NavbarComponent,
    FooterComponent,
    DemandeComponent,
    AboutComponent,
    CookieConsentComponent,
    FaqComponent,
    LoginComponent,
    AdminComponent,
    DashboardComponent,
    DemandesComponent,
    MessagesComponent,
    TraitementComponent,
    ContactComponent,
    InfoComponent,
    ActualitesComponent,
    LectureComponent,
    PublierComponent,
    GestionadminComponent,
    LireComponent,
    ConditionsComponent,
    ConfidentialiteComponent,
    SecuriteComponent,
    CentreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
