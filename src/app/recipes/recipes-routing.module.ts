import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { NoRecipeComponent } from './no-recipe/no-recipe.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipesDetailsComponent } from './recipes-details/recipes-details.component';
import { AuthGuard } from '../auth/auth.guard.service';


const recipesRoutes: Routes = [
  {path: '', component: RecipesComponent ,
  children:[{path: '', component: NoRecipeComponent},
            {path: 'new', component: RecipesEditComponent, canActivate: [AuthGuard] },
            {path: ':id', component: RecipesDetailsComponent },
            {path: ':id/edit', component: RecipesEditComponent, canActivate: [AuthGuard]},
          ] , canActivate: [AuthGuard]}
];


@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule],
    providers: [AuthGuard]
  })
  export class RecipesRoutingModule { }