import { Recipes } from '../recipes.model';
import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/ShoppingListServices/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipes[]>();
    constructor(private slService: ShoppingListService){

    }
     private recipeslist: Recipes[] = 
     [
        new Recipes('Egg Curry','This is Egg Curry with three egg',
        'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg'
        ,[new Ingredient('egg', 10),
         new Ingredient('water', 1)]),
        new Recipes('Chicken','This is Chicken curry with chease',
        'https://i2.wp.com/www.primaverakitchen.com/wp-content/uploads/2019/03/Garlic-Butter-Baked-Chicken-Breast-Primavera-Kitchen-2-500x375.jpg'
        ,[new Ingredient('meat', 1),
         new Ingredient('frech fries', 100)]),
         new Recipes('Pizza','This is new cheze Chicken pizza',
         'https://www.simplyrecipes.com/wp-content/uploads/2007/01/homemade-pizza-horiz-a-1200.jpg'
         ,[new Ingredient('buns', 10),
          new Ingredient('capcicum', 5)])
      ];

      // recipeSelected = new EventEmitter<Recipes>();

      getRecipes(){
          return this.recipeslist.slice();
      }

      setRecipes(recipes: Recipes[]){
        this.recipeslist = recipes;
        this.recipeChanged.next(this.recipeslist.slice());
      }

      addIngredientToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
      }
      
      getRecipe(index: number){
        return this.recipeslist[index];
      }

      addRecipe(recipe: Recipes){
        this.recipeslist.push(recipe);
        this.recipeChanged.next(this.recipeslist.slice());
      }

      updateRecipe(id: number , newRecipe: Recipes){
        this.recipeslist[id] = newRecipe;
        this.recipeChanged.next(this.recipeslist.slice());
      }

      deleteRecipe(id: number){
        this.recipeslist.splice(id,1);
        this.recipeChanged.next(this.recipeslist.slice());
      }
}
