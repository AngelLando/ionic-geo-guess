import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllThumbnailsPage } from './all-thumbnails.page';

const routes: Routes = [
  {
    path: '',
    component: AllThumbnailsPage
  },
  {
    path: 'guess/:guessId',
    loadChildren: () => import('./guess/guess.module').then( m => m.GuessPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllThumbnailsPageRoutingModule {}
