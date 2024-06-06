import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';

import { FavoritesComponent } from './components/favorites/favorites/favorites.component';
import { BookDetailsComponent } from './components/bookDetails/book-details/book-details.component';
import { AuthordetailsComponent } from './components/authordetails/authordetails/authordetails.component';


const routes: Routes = [
  { path: 'home', component:HomeComponent },
  { path: 'book/:id', component: BookDetailsComponent }, 
  { path: '', redirectTo: '/home', pathMatch: 'full'}, 
  { path: 'authors/:id', component: AuthordetailsComponent },
  { path: 'favorites', component: FavoritesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
