import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuessesPageRoutingModule } from './guesses-routing.module';

import { GuessesPage } from './guesses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuessesPageRoutingModule
  ],
  declarations: [GuessesPage]
})
export class GuessesPageModule {}
