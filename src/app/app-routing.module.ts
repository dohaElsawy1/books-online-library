import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { FavoritesComponent } from './components/favorites/favorites/favorites.component';

const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'search', component: HomeComponent }, 
  { path: 'favorite', component: FavoritesComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
