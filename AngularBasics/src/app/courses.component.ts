import { Component } from '@angular/core';
import { CoursesService } from './courses.service';

@Component({
    selector: 'courses',
    template: `
    <h2>{{"Databinding:" + title}}</h2>
    <h2>{{"Interpolation:" + getTitle()}}</h2>
    <ul>
    <li *ngFor= "let course of courses">
    {{course}}
    </li>
    </ul>
    <img [src]="imageURL">
    <table>
    <span>colspan is known property of TD so need to add [attr.colspan]</span>
    <tr>
    <td [attr.colspan]="colspan">
    </td>
    </tr>
    </table>
    <button class="btn btn-primary">Save</button>
    <br><br><span>Class Binding</span><br><br>
    <button class="btn btn-primary" [class.active]="isActive">isActive(class binding testing)</button>
    <br><br><span>Style Binding</span><br><br>
    <button class="btn btn-primary" [style.backgroundColor]="isActive? 'blue' : 'white'">isActive(style binding testing)</button>
    <br><br><span>Event Binding</span><br><br>
    <button (click)="onClick($event)">Event Binding</button>
    <br><br><span>Event Bubbling</span><br><br>
    <div (click)="onDivClicked()">
    <button (click)="onClick($event)">Event Bubbling</button>
    </div>
    <br><br><span>Event Filtering</span><br><br>
    <input (keyup.enter)="onKeyUp($event)"/>
    <br><br><span>Templete Variables</span><br><br>
    <input (keyup.enter)="onKeyUp($event)"/>
    <br><br><span>Templete Variables-other way</span><br><br>
    <input #email (keyup.enter)="onTKeyUp(email.value)"/>
    <br><br><span>Two way binding</span><br><br>
    <input [(ngModel)]="email1" (keyup.enter)="onT2KeyUp()"/>
    <br><br><span>Pipes</span><br><br>
    {{course.title | uppercase}}<br>
    {{course.students | number}}<br>
    {{course.rating | number:'2.1-1'}}<br>
    {{course.price | currency:'AUD':true:'3.2-2'}}<br>
    {{course.releaseDate | date:'shortDate'}}
    <br><br><span>Custom Pipe</span><br><br>
    {{text | summary:10}}
    
    `
})

export class CoursesComponent{
    title="List of Courses";
    courses;
    text="dhjska djka jdska hjkd ahd dj dkjhdjhdjkdhskjhd j hsjahdjkd audhks hs dkj djkhdkdhk j k hjdkh djkahd";
    course={
        title: "Computer Science",
        rating: 4.9883, 
        students: 373737,
        price: 190.99,
        releaseDate: new Date(2016,3,1)
        
    }
    imageURL="";
    colspan="";
    isActive=true;
    email1: string="test@t.com";
    constructor(service: CoursesService){
    this.courses=service.getCourses();
    }
    onClick($event:any){
        $event?.stopPropagation(); //To stop event bubbling
        console.log("Event clicked",$event);
    }
    onKeyUp($event:any){
        console.log("Enter clicked",$event);
        console.log("Value: ",$event.target.value);
    }
    onTKeyUp(email:any){
        
        console.log("Value: ",email);
    }
    onT2KeyUp(){
        
        console.log("Value: ",this.email1);
    }
    onDivClicked(){
        console.log("Div Event clicked");
    }
    getTitle(){
        return this.title;
    }
}