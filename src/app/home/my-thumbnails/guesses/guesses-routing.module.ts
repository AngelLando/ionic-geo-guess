import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuessesPage } from './guesses.page';

const routes: Routes = [
  {
    path: '',
    component: GuessesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuessesPageRoutingModule {}
