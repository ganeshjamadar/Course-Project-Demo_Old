import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
  // {path: '' , redirectTo: '/recipes', pathMatch: 'full' },
  {path: '', component: HomeComponent},
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  {path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
  {path: 'unauthorized', component: UnauthorizedComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
