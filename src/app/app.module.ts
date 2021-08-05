import { environment } from './../environments/environment.prod';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**Http Client */
import { HttpClientModule } from '@angular/common/http';

/**Firebase */
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

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
import { NewRestaurantComponent } from './new-restaurant/new-restaurant.component';
import { IndividualRestaurantComponent } from './individual-restaurant/individual-restaurant.component';
import { RestaurantFilterPipe } from './shared/restaurant-filter.pipe';
import { LoginPageComponent } from './login-page/login-page.component';

/**Tradução */
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';

registerLocaleData(localeBr, 'pt')


@NgModule({
  declarations: [
    AppComponent,
    RestaurantsComponent,
    NewRestaurantComponent,
    IndividualRestaurantComponent,
    RestaurantFilterPipe,
    LoginPageComponent
  ],
  imports: [

    /**Firebase */
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,

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
