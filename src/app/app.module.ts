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
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
