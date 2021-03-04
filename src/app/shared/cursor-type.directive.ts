import { Directive, ElementRef, Input } from '@angular/core'

@Directive({
  selector: '[appCursorType]',
})
export class CursorTypeDirective {
  @Input('appCursorType') cursorType: string

  constructor(private el: ElementRef) {
    el.nativeElement.style.cursor = this.cursorType
      ? this.cursorType
      : 'pointer'
  }
}
