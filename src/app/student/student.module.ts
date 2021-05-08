import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StudentRoutingModule } from './student-routing.module';
import { StudentViewComponent } from './student-view/student-view.component';

@NgModule({
  declarations: [StudentViewComponent],
  imports: [CommonModule, StudentRoutingModule],
})
export class StudentModule {}
