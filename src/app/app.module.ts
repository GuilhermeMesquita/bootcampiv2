import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**Material Imports */
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { HttpClientModule } from '@angular/common/http';
import { NewRestaurantComponent } from './new-restaurant/new-restaurant.component';
import { IndividualRestaurantComponent } from './individual-restaurant/individual-restaurant.component';



@NgModule({
  declarations: [
    AppComponent,
    RestaurantsComponent,
    NewRestaurantComponent,
    IndividualRestaurantComponent
  ],
  imports: [
    /**Requisição HttpClient */
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    /**Materials */
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
