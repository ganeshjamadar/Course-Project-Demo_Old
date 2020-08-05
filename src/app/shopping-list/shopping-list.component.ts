import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';
import { INFERRED_TYPE } from '@angular/compiler/src/output/output_ast';
import { ShoppingListService } from './ShoppingListServices/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../Shared/DataStorageService';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit , OnDestroy{
  private ingredientChangesSubs: Subscription
  ingredients: Ingredient[];
  constructor(private shoppingListService: ShoppingListService,
              private route: ActivatedRoute,
              private router: Router,
              private dataStorage: DataStorageService,
              private authService: AuthService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    //this.dataStorage.GetData();
    this.ingredientChangesSubs = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => 
      this.ingredients = ingredients
    );
    if(this.authService.isAuthenticated())
    {
      //this.dataStorage.GetIngredients();
    }
  }

  ItemClicked(index: number){
    this.shoppingListService.startedEditing.next(index);
  }

  // onIngredientClick(name: string){
  //   this.router.navigate(['../ingredient', name], {relativeTo: this.route});
  // }

  ngOnDestroy(){
    this.ingredientChangesSubs.unsubscribe();
  }

  // onIngredentAdded(ingredient: Ingredient){
  //   this.ingredients.push(ingredient);
  // }

}
