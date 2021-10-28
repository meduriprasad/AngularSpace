import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../interface/post';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  private post: Post = {
    'userId': 1,
    'id': 1,
    'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
  };

  posts: Post[] | undefined;
  constructor(private service: PostService) { 
  }

  ngOnInit(): void {
    this.onGetPosts();
    this.onGetPost();
  }


  onGetPosts(){
    this.service.getPosts().
    subscribe((response) => {
      console.log(response);
      this.posts=response;
    },
    (error: any) => console.log(error),
    () => console.log('Done getting posts'));
  }

  onGetPost(): void{
    this.service.getPost().subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done getting the post')
    );
  }

  onCreatePost(input: HTMLInputElement): void{
    this.post.title=input.value;
    input.value='';
    this.service.createPost(this.post).subscribe(
      
      (response) => {
        this.posts.splice(0,0,this.post);
        console.log(response);
      },
      (error: any) => console.log(error),
      () => console.log('Done creating the user')
    );
  }

  onUpdatePost(): void{
    this.service.updatePost(this.post).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done updating the user')
    );
  }

  onPatchPost(): void{
    this.service.patchPost(this.post).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done patching the user')
    );
  }

  onDeletePost(post: Post): void{
    this.service.deletePost(post.id).subscribe(
      (response) => {
        let index=this.posts.indexOf(post);
        this.posts.splice(index,1);
        console.log(response);
      },
      (error: Response) => {
        if (error.status===404){
          alert("This post already been deleted");
        }else{
          alert("Unexpected error occured");
          console.log(error);
        }
        console.log(error)
      },
      () => console.log('Done deleting the user')
    );
  }
}
