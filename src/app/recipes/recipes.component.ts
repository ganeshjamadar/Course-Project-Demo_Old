import { Component, OnInit } from '@angular/core';
import { Recipes } from './recipes.model';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from '../Shared/DataStorageService';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  selectedRecipe: Recipes;

  constructor(private route: ActivatedRoute, 
      private dataStorage: DataStorageService,
      private authService: AuthService) { }

  ngOnInit() {
    // this.route.data.subscribe(
    //   (data: Data) => {
    //     this.selectedRecipe 
    //   }
    // );

    // this.recipeService.recipeSelected.subscribe(
    //   (recipe: Recipes) => {
    //     this.selectedRecipe = recipe;
    //   }
    // );
    if(this.authService.isAuthenticated())
    {
      //this.dataStorage.GetRecipes();
    }
  }

}
