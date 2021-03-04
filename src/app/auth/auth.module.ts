import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SharedModule } from './../shared/shared.module'
import { AuthComponent } from './auth.component'

const routes: Routes = [{ path: '', component: AuthComponent }]

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class AuthModule {}
