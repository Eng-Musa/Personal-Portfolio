import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

 
  myForm!: FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      message: ['']
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

 
  sendEmail(): void {
    console.log("Reached");
    
    const params = {
      firstName: (document.getElementById("firstName") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      subject: (document.getElementById("subject") as HTMLInputElement).value,
      message: (document.getElementById("message") as HTMLInputElement).value
    };

    const serviceID = "service_dq9mftf";
    const templateID = "template_40jjyi9";

    emailjs.send(serviceID, templateID, params, "9DKWFtLDRvj4w03sQ")
      .then((res) => {
        (document.getElementById("firstName") as HTMLInputElement).value = "";
        (document.getElementById("email") as HTMLInputElement).value = "";
        (document.getElementById("message") as HTMLInputElement).value = "";
        console.log(res);
        alert("Message sent!");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
