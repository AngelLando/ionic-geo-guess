import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyThumbnailsPage } from './my-thumbnails.page';

const routes: Routes = [
  {
    path: '',
    component: MyThumbnailsPage
  },
  {
    path: 'edit-thumbnail',
    loadChildren: () => import('./edit-thumbnail/edit-thumbnail.module').then( m => m.EditThumbnailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyThumbnailsPageRoutingModule {}
