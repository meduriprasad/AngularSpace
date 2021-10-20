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
    <tr>
    <td [attr.colspan]="colspan">
    </td>
    </tr>
    </table>
    <button class="btn btn-primary">Save</button>
    `
})

export class CoursesComponent{
    title="List of Courses";
    courses;
    imageURL="";
    colspan="";
    constructor(service: CoursesService){
    this.courses=service.getCourses();
    }

    getTitle(){
        return this.title;
    }
}