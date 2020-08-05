import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RecipesComponent } from './recipes.component';
import { RecipesDetailsComponent } from './recipes-details/recipes-details.component';
import { RecipesItemComponent } from './recipes-list/recipes-item/recipes-item.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { NoRecipeComponent } from './no-recipe/no-recipe.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../Shared/shared.module';


@NgModule({
    declarations: [
        RecipesComponent,
        RecipesDetailsComponent,
        RecipesEditComponent,
        RecipesItemComponent,
        RecipesListComponent,
        NoRecipeComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule
    ]
})
export class RecipesModule
{

}