import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {MatListModule} from '@angular/material/list';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatListModule
  ]
  , exports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatListModule
  ]
})
export class MaterialModule { }
