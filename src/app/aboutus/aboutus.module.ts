import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { MatIconButton } from '@angular/material/button';

@NgModule({

  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
