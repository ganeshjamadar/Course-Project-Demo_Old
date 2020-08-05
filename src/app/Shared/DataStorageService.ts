import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { RecipeService } from '../recipes/RecipeServices/recipe.service';
import { Recipes } from '../recipes/recipes.model';
import { ShoppingListService } from '../shopping-list/ShoppingListServices/shopping-list.service';
import { Ingredient } from './ingredient.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService{

    constructor(private httpClient: HttpClient, 
            private recipeService: RecipeService,
            private shoppingList: ShoppingListService,
            private authService: AuthService
         )
    {

    }

    SaveData()
    {
        this.SaveRecipes();
        this.SaveIngredient();
    }

    SaveRecipes()
    {
        // const token = this.authService.getToken();

        // this.http.put('https://recipedemo-9131e.firebaseio.com/recipes.json?auth=' + token
        // ,  this.recipeService.getRecipes())
        // .subscribe(
        //     (response) =>
        //     {
        //         console.log(response);
        //     },
        //     (error) => 
        //     {
        //         console.log(error);
        //     }
        // );

        // const req = new HttpRequest('PUT', 'https://recipedemo-9131e.firebaseio.com/recipes.json'
        // ,this.recipeService.getRecipes(), {reportProgress: true, params: new HttpParams().set('auth', token)})

        const req = new HttpRequest('PUT', 'https://recipedemo-9131e.firebaseio.com/recipes.json'
        ,this.recipeService.getRecipes(), {reportProgress: true})

        return this.httpClient.request(req)
        .subscribe(
            (response) =>
            {
                console.log(response);
            },
            (error) => 
            {
                console.log(error);
            }
        );

    }

    SaveIngredient()
    {
        //const token = this.authService.getToken();

        return this.httpClient.put('https://recipedemo-9131e.firebaseio.com/ingredients.json'
        ,  this.shoppingList.getIngredients())
        .subscribe(
            (response) =>
            {
                console.log(response);
            },
            (error) => 
            {
                console.log(error);
            }
        );;
    }
    
    GetData()
    {
        this.GetRecipes();
        this.GetIngredients()
    }

    GetRecipes()
    {
        // const token = this.authService.getToken();

        // this.httpClient.get<Recipes[]>('https://recipedemo-9131e.firebaseio.com/recipes.json'
        // ,{
        //     observe: 'body',
        //     params: new HttpParams().set('auth', token)
        //  })
        // .pipe(
        //     map( 
        //         (response: Recipes[]) => {
        //             const recipes = response;
        //             for(let recipe of recipes)
        //             {
        //                 if(!recipe['ingredients'])
        //                 {
        //                     recipe['ingredients'] = [];
        //                 }
        //             }
        //             return recipes;
        //         }
        //     ) 
        //     ,
        //     catchError(
        //         (error: HttpErrorResponse) =>
        //         {
        //             throw new Error("Something went Wrong. Please check your request");
                    
        //         }
        //     ))
        //     .subscribe(
        //         (recipes: Recipes[]) =>
        //         {
        //             this.recipeService.setRecipes(recipes);
        //         }
        //     );

        this.httpClient.get<Recipes[]>('https://recipedemo-9131e.firebaseio.com/recipes.json')
        .pipe(
            map( 
                (response: Recipes[]) => {
                    const recipes = response;
                    for(let recipe of recipes)
                    {
                        if(!recipe['ingredients'])
                        {
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            ) 
            ,
            catchError(
                (error: HttpErrorResponse) =>
                {
                    throw new Error("Something went Wrong. Please check your request");
                    
                }
            ))
            .subscribe(
                (recipes: Recipes[]) =>
                {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }

    GetIngredients()
    {
        //const token = this.authService.getToken();

        this.httpClient.get<Ingredient[]>('https://recipedemo-9131e.firebaseio.com/ingredients.json')
        .pipe(
            map( 
                (response: Ingredient[]) => {
                    const ingredients = response;
                    return ingredients;
                }
            ) 
            ,
            catchError(
                (error: HttpErrorResponse) =>
                {
                    throw new Error("Something went Wrong. Please check your request");
                    
                }
            ))
            .subscribe(
                (ingredients: Ingredient[]) =>
                {
                    this.shoppingList.setIngredients(ingredients);
                }
            );
    }
}