import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-head-bar',
  imports: [FontAwesomeModule],
  templateUrl: './head-bar.html',
  styleUrl: './head-bar.css',
})
export class HeadBar {
  faHeart=faHeart
  router=inject(Router)
  navigateToWishList(){
    this.router.navigate(['wishlist'])
  }
}