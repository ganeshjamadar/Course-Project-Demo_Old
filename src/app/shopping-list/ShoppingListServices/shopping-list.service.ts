import { Ingredient } from 'src/app/Shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService{

    private ingredients: Ingredient [] = 
      [
        new Ingredient('Apple',5),
        new Ingredient('Tomatoes',10)
      ];

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    getIngredients(): Ingredient[]{
        return this.ingredients.slice();
    }

    setIngredients(ingredients: Ingredient[])
    {
        this.ingredients = ingredients;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    getIngredient(index: number): Ingredient{
        return this.ingredients[index];
    }

    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients);
    }

    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients);
        
        // for(let ingredient of ingredients)
        // {
        //     this.addIngredient(ingredient);
        // }

    }
    
    // deleteIngredient(index: number){
    //     this.ingredients.splice(index,1)
    //     this.ingredientsChanged.next(this.ingredients);
    // }
}