import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat-test.component';
import { ChatFormComponent } from './components/chat-form/chat-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChatModule } from 'ng-chat';
import { BharatrpatilChatComponent } from './components/bharatrpatil-chat/bharatrpatil-chat.component';
import { Ob1FormularioComponent } from './components/obstest1/ob1-formulario/ob1-formulario.component';
import { Ob1ListaComponent } from './components/obstest1/ob1-lista/ob1-lista.component';
import { Ob1NavbarComponent } from './components/obstest1/ob1-navbar/ob1-navbar.component';
import { Ob1AppComponent } from './components/obstest1/ob1-app/ob1-app.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RouterModule, Routes } from '@angular/router';
import { SettingsDialogsComponent } from './components/settings-dialogs/settings-dialogs.component';
import { SettingsChoicesComponent } from './components/settings-choices/settings-choices.component';
import { SettingsChatComponent } from './components/settings-chat/settings-chat.component';

const appRoutes: Routes = [
  { path: '', component: BharatrpatilChatComponent },
  {
    path: 'settings', component: SettingsComponent, 
    children: [
      {
        path: 'opciones',
        component: SettingsChoicesComponent,
      },
      {
        path: 'dialogos',
        component: SettingsDialogsComponent,
      },
    ], },
]

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatFormComponent,
    BharatrpatilChatComponent,
    Ob1FormularioComponent,
    Ob1ListaComponent,
    Ob1NavbarComponent,
    Ob1AppComponent,
    SettingsComponent,
    SettingsDialogsComponent,
    SettingsChoicesComponent,
    SettingsChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgChatModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
