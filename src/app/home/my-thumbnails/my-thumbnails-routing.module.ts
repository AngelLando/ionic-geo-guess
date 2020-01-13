import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyThumbnailsPage } from './my-thumbnails.page';

const routes: Routes = [
  {
    path: '',
    component: MyThumbnailsPage
  },
  {
    path: 'edit/:thumbnailId',
    loadChildren: () => import('./edit-thumbnail/edit-thumbnail.module').then( m => m.EditThumbnailPageModule)
  },
  {
    path: ':thumbnailId/guesses',
    loadChildren: () => import('./guesses/guesses.module').then( m => m.GuessesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyThumbnailsPageRoutingModule {}
