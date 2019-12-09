import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateThumbnailPage } from './create-thumbnail.page';

const routes: Routes = [
  {
    path: '',
    component: CreateThumbnailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateThumbnailPageRoutingModule {}
