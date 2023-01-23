import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";

import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    FormsModule,
    RouterModule.forChild([
      {path: '', component: ShoppingListComponent}
    ]),
    CommonModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatListModule
  ]
})
export class ShoppingListModule {
}
