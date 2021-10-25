import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularBasics';
  courses:any[]=[1,2];
  post={
    isFavorite: true
  }
  onFavoriteChanged(isFavorite:any){
    console.log("Favorite changed",isFavorite);
  }
}
