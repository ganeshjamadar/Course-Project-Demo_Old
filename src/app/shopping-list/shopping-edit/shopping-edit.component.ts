import { Component, OnInit, ViewChild, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import { ShoppingListService } from '../ShoppingListServices/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , AfterViewInit, OnDestroy {

  // @ViewChild("inputName", {static: false}) inputNameRef : ElementRef;
  // @ViewChild("inputAmount", {static: false}) inputAmountRef: ElementRef;
  @ViewChild("f", {static: false}) ingredientForm: NgForm;
  name: string;
  editedIngredient: Ingredient;
  editorSub: Subscription;
  editMode= false;
  editedingredientIndex: number;
  constructor(private shoppinListServie: ShoppingListService,
              private route: ActivatedRoute,
              private router: Router,
              private renderr: Renderer2) { }

  ngOnInit() {
    this.editorSub = this.shoppinListServie.startedEditing.subscribe(
      (index: number) =>{
        this.editMode = true;
        this.editedingredientIndex = index;
        this.editedIngredient = this.shoppinListServie.getIngredient(index);
        this.ingredientForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        })
      }
    );

    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.name = params['name'];
    //   }
    // );
  }

  ngAfterViewInit(){
    // if(this.name !== undefined)
    // {
    //   this.ingredient = this.shoppinListServie.getIngredients()
    //   .find(ingredient => ingredient.name === this.name);
    //   this.renderr.setProperty(this.inputNameRef.nativeElement, 'value', this.ingredient.name);
    //   this.renderr.setProperty(this.inputAmountRef.nativeElement, 'value', this.ingredient.amount);
    // }
  }

  // onIngredentAdded()
  // {
  //   const name = this.inputNameRef.nativeElement.value;
  //   const amount = this.inputAmountRef.nativeElement.value;
  //   const ingerdent = new Ingredient(name, amount);
  //   this.shoppinListServie.addIngredient(ingerdent);
  // }

  onSubmit(){
    // console.log(this.ingredientForm);
    const name = this.ingredientForm.value.name;
    const amount = this.ingredientForm.value.amount;
    const newIngredient = new Ingredient(name, amount);
    if(this.editMode){
      this.shoppinListServie.updateIngredient(this.editedingredientIndex,newIngredient)
      this.editMode = false;
    }
    else{
      this.shoppinListServie.addIngredient(newIngredient);
    }
    this.ingredientForm.reset();
  }

  onDelete(){
    if(this.editMode)
    {
      this.shoppinListServie.deleteIngredient(this.editedingredientIndex);
      this.editMode = false;
      this.ingredientForm.reset();
    }
  }

  onClear(){
    this.ingredientForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(){

  }

  // onIngredentDeleted(){
  //   const index = this.shoppinListServie.getIngredients()
  //   .findIndex(ingredient => ingredient.name === this.name);
  //   this.shoppinListServie.deleteIngredient(index);
  //   this.router.navigate(['../../shopping-list'], {relativeTo: this.route});
  // }

  // onClear(){
  //   this.renderr.setProperty(this.inputNameRef.nativeElement, 'value', '');
  //   this.renderr.setProperty(this.inputAmountRef.nativeElement, 'value', '');
  // }

}
