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
    FaqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
