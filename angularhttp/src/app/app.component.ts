import { UserService } from './service/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from './interface/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angularhttp';
  private user: User = {
    'name': 'Test Graham',
    'username': 'TEST',
    'email': 'Sincere@april.biz',
    'address': {
    'street': 'Kulas Light',
    'suite': 'Apt. 556',
    'city': 'Gwenborough',
    'zipcode': '92998-3874',
    'geo': {
    'lat': '-37.3159',
    'lng': '81.1496'
    }
    },
    'phone': '1-770-736-8031 x56442',
    'website': 'hildegard.org',
    'company': {
    'name': 'Romaguera-Crona',
    'catchPhrase': 'Multi-layered client-server neural-net',
    'bs': 'harness real-time e-markets'
    }
    }
  constructor(private userService: UserService){
  }

  ngOnInit(): void {
    this.onCreateUser();
    this.onGetUsers();
    this.onGetUser();
  }

  onGetUsers(): void{
    this.userService.getUsers().subscribe(
      (response) => console.table(response),
      (error: any) => console.log(error),
      () => console.log('Done getting the data')
    );
  }

  onGetUser(): void{
    this.userService.getUser().subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done getting the user')
    );
  }

  onCreateUser(): void{
    this.userService.createUser(this.user).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done creating the user')
    );
  }

}
