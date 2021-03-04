import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive'
import { Router } from '@angular/router'
import { AuthService, AuthResponseData } from './auth.service'
import { NgForm } from '@angular/forms'
import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { AlertComponent } from '../shared/alert/alert.component'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective
  private alertCloseSub: Subscription
  isLoginMode = true
  isLoading = false
  error: string = null

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    const email = form.value.email
    const password = form.value.password
    let authObs: Observable<AuthResponseData>
    this.isLoading = true
    if (this.isLoginMode) {
      authObs = this.authService.logIn(email, password)
    } else {
      authObs = this.authService.signUp(email, password)
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData)
        this.isLoading = false
        this.router.navigate(['/recipes'])
      },
      (errorMessage) => {
        this.error = errorMessage
        this.showErrorAlert(errorMessage)
        this.isLoading = false
      }
    )
    form.reset()
  }
  onHandleError() {
    this.error = null
  }
  private showErrorAlert(msg: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    )
    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear()
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory)
    componentRef.instance.message = msg
    this.alertCloseSub = componentRef.instance.close.subscribe(() => {
      this.alertCloseSub.unsubscribe()
      hostViewContainerRef.clear()
    })
  }
  ngOnDestroy() {
    if (this.alertCloseSub) {
      this.alertCloseSub.unsubscribe()
    }
  }
}
