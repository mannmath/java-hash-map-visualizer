import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { PropertiesBarComponent } from './properties-bar/properties-bar.component';
import { ItemsBarComponent } from './items-bar/items-bar.component';
import { DescriptionBarComponent } from './description-bar/description-bar.component';
import { VisualizerSpaceComponent } from './visualizer-space/visualizer-space.component';
import { StarterPagesComponent } from './starter-pages/starter-pages.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PropertiesBarComponent,
    ItemsBarComponent,
    DescriptionBarComponent,
    VisualizerSpaceComponent,
    StarterPagesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
