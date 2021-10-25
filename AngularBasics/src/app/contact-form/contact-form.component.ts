import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contactMethods = [
    {id: 0, name: ''},
    {id: 1, name: 'Email'},
    {id: 2, name: 'Phone'}
  ]
  constructor() { }

  ngOnInit(): void {
  }

  log(x:any){
    console.log(x);
  }

  submit(f:any){
    console.log(f);
  }

}
