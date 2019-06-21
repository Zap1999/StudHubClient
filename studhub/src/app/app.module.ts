import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TagsModule } from './tags/tags.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionsPageComponent } from './questions/question-page/questions-page.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material';
import { ErrorInterceptor } from './_helpers/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TagsModule,
    ReactiveFormsModule,
    FormsModule,
    QuestionsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule,
    MatSnackBarModule
  ],

  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, QuestionsComponent, QuestionsPageComponent],

  bootstrap: [AppComponent]
})
export class AppModule { }
