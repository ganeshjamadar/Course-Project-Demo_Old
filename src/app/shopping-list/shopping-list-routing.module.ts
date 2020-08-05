import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard.service';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';


const shoppingListRoutes: Routes = [
    {path: '', component: ShoppingListComponent, canActivate: [AuthGuard]},
    {path: 'ingredient/:name', component: ShoppingEditComponent},
];


@NgModule({
    imports: [RouterModule.forChild(shoppingListRoutes)],
    exports: [RouterModule],
    providers: [AuthGuard]
  })
  export class ShoppingListRoutingModule { }