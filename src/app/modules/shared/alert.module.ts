import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '@app/views/shared/alert/alert.component';



@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule],
  exports: [AlertComponent]
})
export class AlertModule { }
