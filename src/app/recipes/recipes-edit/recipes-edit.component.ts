import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../RecipeServices/recipe.service';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  previewAllowed = false;
  constructor(private route: ActivatedRoute,private recipeService: RecipeService,
              private router: Router) 
  { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) =>{
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm(){
    let recipeName = '';
    let recipeImgPath= '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if(this.editMode)
    {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImgPath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit(){
    // const newRecipe = new Recipes(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients'],
    // );

    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
      this.router.navigate(['../'], {relativeTo: this.route});
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value);
      const newRecipeId = (this.recipeService.getRecipes().length -1);
      this.recipeForm.reset();
      this.router.navigate(['recipes', newRecipeId]);
    }
    
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onCancel(){
    this.recipeForm.reset();
    this.router.navigate(['recipes']);
  }

  // onToggle(){
  //   this.previewAllowed = !this.previewAllowed;
  // }

  onDeleteIngredinet(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  
  get getIngredient()
  {
    return <FormArray>this.recipeForm.get('ingredients');
  }
}
