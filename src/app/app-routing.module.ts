import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiphyComponent } from './giphy/giphy.component';

const routes: Routes = [
  {
    path: 'giphy',
    component: GiphyComponent
  },
  {
    path: '',
    redirectTo: '/giphy',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
