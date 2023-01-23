import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

import { AuthComponent } from "./auth.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [AuthComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {path: '', component: AuthComponent}
        ]),
        SharedModule,
        MatInputModule,
        MatButtonModule
    ]
})
export class AuthModule {
}
