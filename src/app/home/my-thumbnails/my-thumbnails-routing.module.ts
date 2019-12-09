import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyThumbnailsPage } from './my-thumbnails.page';

const routes: Routes = [
  {
    path: '',
    component: MyThumbnailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyThumbnailsPageRoutingModule {}
