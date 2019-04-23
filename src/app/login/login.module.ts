import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [MaterialModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
