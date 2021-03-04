import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DropdownDirective } from './dropdown.directive'
import { PlaceholderDirective } from './placeholder/placeholder.directive'
import { CursorTypeDirective } from './cursor-type.directive'
import { AlertComponent } from './alert/alert.component'
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component'

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    CursorTypeDirective,
    PlaceholderDirective,
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    CursorTypeDirective,
    PlaceholderDirective,
  ],
})
export class SharedModule {}
