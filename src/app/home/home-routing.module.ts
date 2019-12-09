import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '/home/all-thumbnails',
    component: HomePage,
    children: [
      {
        path: 'scores',
        loadChildren: () => import('./scores/scores.module').then( m => m.ScoresPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: 'create-thumbnail',
        loadChildren: () => import('./create-thumbnail/create-thumbnail.module').then( m => m.CreateThumbnailPageModule)
      },
      {
        path: 'my-thumbnails',
        loadChildren: () => import('./my-thumbnails/my-thumbnails.module').then( m => m.MyThumbnailsPageModule)
      },
      {
        path: 'all-thumbnails',
        loadChildren: () => import('./all-thumbnails/all-thumbnails.module').then( m => m.AllThumbnailsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
