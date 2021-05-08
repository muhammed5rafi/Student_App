import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashbordRoutingModule } from './dashbord-routing.module';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';

@NgModule({
  declarations: [SideNavbarComponent, TopNavbarComponent],
  imports: [CommonModule, DashbordRoutingModule],
})
export class DashbordModule {}
