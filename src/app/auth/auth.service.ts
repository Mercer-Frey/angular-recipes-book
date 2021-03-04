import { environment } from '../../environments/environment'
import { Router } from '@angular/router'
import { User } from './user.model'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

export interface AuthResponseData {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  localId: string
  expiresIn: string
  registered?: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null)
  private tokenExpirationTimer: any

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(handlerApiUrl('signUp'), {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthetication(resData)
        })
      )
  }
  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(handlerApiUrl('signInWithPassword'), {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthetication(resData)
        })
      )
  }
  autoLogIn() {
    const userData: {
      email: string
      id: string
      _token: string
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'))
    if (!userData) {
      return
    }
    const loadedUser = this.handleAutoAuthetication(userData)

    if (loadedUser.token) {
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.user.next(loadedUser)
      this.autoLogOut(expirationDuration)
    }
  }
  logOut() {
    this.user.next(null)
    localStorage.removeItem('userData')
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
    this.router.navigate(['/auth'])
  }
  autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut()
    }, expirationDuration)
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured'
    console.log(error)

    if (!error.error || !error.error.error.message) {
      return throwError(errorMessage)
    }
    switch (error.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.'
        break
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier. The user may have been deleted.'
        break
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password.'
        break
    }
    return throwError(errorMessage)
  }
  private handleAuthetication({ email, localId, idToken, expiresIn }) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000)
    const user = new User(email, localId, idToken, expirationDate)
    this.user.next(user)
    this.autoLogOut(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }
  private handleAutoAuthetication({ email, id, _token, _tokenExpirationDate }) {
    return new User(email, id, _token, new Date(_tokenExpirationDate))
  }
}

function handlerApiUrl(method) {
  return `https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=${environment.firebaseAPIKey}`
}
