import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatListModule } from "@angular/material/list";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatMenuModule } from "@angular/material/menu";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";
import * as fromApp from './store/app.reducer'
import { AuthEffects } from "./auth/store/auth.effects";
import { environment } from "../environments/environment";
import { RecipeEffects } from "./recipes/store/recipe.effects";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    HttpClientModule,
    SharedModule,
    CoreModule,
    MatToolbarModule,
    MatButtonModule,
    MatRippleModule,
    MatListModule,
    MatTabsModule,
    MatSidenavModule,
    MatMenuModule,
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
