import { Subscription } from 'rxjs'
import { AuthService } from '../auth/auth.service'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { DataStorageService } from '../services/data-storage.service'

@Component({
  styleUrls: ['./header.component.css'],
  templateUrl: 'header.component.html',
  selector: 'app-header',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAutheticated = false
  private userSub: Subscription

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAutheticated = !!user
    })
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
  }
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe((recipes) => {})
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }
  logOut() {
    this.authService.logOut()
  }
}
