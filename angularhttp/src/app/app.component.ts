import { UserService } from './service/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from './interface/user';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  fileStatus = { status: '', percentage: 0 };
  title = 'angularhttp';
  
  private user: any = {
    'id': 2,
    'name': 'Junior Graham',
    'username': 'junior',
    'email': 'junior@april.biz'
  };

    private updateUser: User = {
      'id': 5,
      'name': 'Test1 Graham',
      'username': 'TEST1',
      'email': 'Sincere@april.biz',
      'phone': '1-770-736-8031 x56442',
      'website': 'hildegard.org',
      }

      private patchUser: any = {
        'id': 5,
        'name': 'Patch Graham',
        'username': 'Patch',
        }
        users: User[] | undefined;
  constructor(private userService: UserService){
  }

  ngOnInit(): void {
    // this.onCreateUser();
    this.onGetUsers();
    // this.onGetUser();
    // this.onUpdateUser();
    // this.onPatchUser();
    // this.onDeleteUser();
  }

  onGetUsers(): void{
    this.userService.getUsers().subscribe(
      (response) => {
        console.log(response);
        this.users = response
      },
      (error: any) => console.log(error),
      () => console.log('Done getting users')
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

  onUpdateUser(): void{
    this.userService.updateUser(this.updateUser).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done updating the user')
    );
  }

  onPatchUser(): void{
    this.userService.patchUser(this.patchUser).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done patching the user')
    );
  }

  onDeleteUser(): void{
    this.userService.deleteUser(5).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done deleting the user')
    );
  }
  onTextFile(): void {
    this.userService.getTextFile().subscribe(
      (response) => console.log('Response: ', response),
      (error: any) => console.log(error),
      () => console.log('Done getting text file')
    );
  } 

  onUploadFile(files: File[]): void {
    console.log(files);
    const formData = new FormData();
        for (const file of files) {
            formData.append('files', file, file.name);
        }
    this.userService.uploadFiles(formData).subscribe(
      (event) => {
        switch (event.type) {
        case HttpEventType.UploadProgress || HttpEventType.DownloadProgress:
          console.log(event);
          this.fileStatus.percentage = Math.round(100 * event.loaded / event.loaded);
          this.fileStatus.status = 'progress';
          console.log(this.fileStatus);
          break;
        case HttpEventType.Response:
          console.log(event);
          if (event.status === 200) {
            console.log(event);
            this.fileStatus.status = 'done';
            this.fileStatus.percentage = 0;
            console.log(this.fileStatus);
            break;
          } else {
            console.log(event);
            this.fileStatus.status = 'done';
            this.fileStatus.percentage = 0;
            break;
          }
        default:
        // Clean up here;
      }
        
      },
      (error: any) => console.log(error),
      () => console.log('Done uploading files')
    );
  }
}
