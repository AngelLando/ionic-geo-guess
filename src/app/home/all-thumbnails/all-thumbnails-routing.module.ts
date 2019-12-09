import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllThumbnailsPage } from './all-thumbnails.page';

const routes: Routes = [
  {
    path: '',
    component: AllThumbnailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllThumbnailsPageRoutingModule {}
