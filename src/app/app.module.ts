import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';


import { AnimalComponent } from './components/animal/animal.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

// Http provider
import { HttpClientModule } from '@angular/common/http';

// NgModel
import { FormsModule } from '@angular/forms';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';

// Dependency animation for some PrimeNg components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Library to fix shadow dom issue with some PrimeNg components
// https://github.com/maitrungduc1410/primeng-shadowdom-directives
import { PrimeNGShadowDOMDirective } from 'primeng-shadowdom-directives';

import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AddFavoriteAnimalComponent } from './components/add-favorite-animal/add-favorite-animal.component';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AnimalComponent,
    EditUserComponent,
    UserDetailsComponent,
    AddFavoriteAnimalComponent,
    LoginComponent,
    RegisterComponent,
    RecoverPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    // NgModule
    FormsModule,

    BrowserAnimationsModule,
    PrimeNGShadowDOMDirective,

    // PrimeNg Components
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DropdownModule,
    FileUploadModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
