import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipes } from '../recipes.model';
import { RecipeService } from '../RecipeServices/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/Shared/DataStorageService';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipeChangedSub: Subscription;
  public recipeslist: Recipes[];
  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private dataStorage: DataStorageService) { }

  ngOnInit() {
    this.recipeslist = this.recipeService.getRecipes();
    this.recipeChangedSub = this.recipeService.recipeChanged.subscribe(
      (recipes: Recipes[]) => {
        this.recipeslist = recipes;
      }
    );
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(){
    this.recipeChangedSub.unsubscribe();
  }

}
