import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]],
    });
  }

  handleFormSubmit() {
    if (this.myForm.invalid) {
      this.sendEmailToMe();
      this.sendEmailToClient();
    } else {
      console.log('Form is invalid');
      alert("Form is invalid");
    }
  }

  sendEmailToMe(): void {

    const params = {
      firstName: (document.getElementById('firstName') as HTMLInputElement)
        .value,
      lastName: (document.getElementById('lastName') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      subject: (document.getElementById('subject') as HTMLInputElement).value,
      message: (document.getElementById('message') as HTMLInputElement).value,
    };

    const serviceID = 'service_dq9mftf';
    const templateID = 'template_40jjyi9';

    emailjs
      .send(serviceID, templateID, params, '9DKWFtLDRvj4w03sQ')
      .then((res) => {
        (document.getElementById('firstName') as HTMLInputElement).value = '';
        (document.getElementById('lastName') as HTMLInputElement).value = '';
        (document.getElementById('email') as HTMLInputElement).value = '';
        (document.getElementById('subject') as HTMLInputElement).value = '';
        (document.getElementById('message') as HTMLInputElement).value = '';
      })
      .catch((err) => {
        console.log(err);
        alert('System error, kindly try later!');
      });
  }

  sendEmailToClient(): void {
    const params = {
      firstName: (document.getElementById('firstName') as HTMLInputElement)
        .value,
      lastName: (document.getElementById('lastName') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      subject: (document.getElementById('subject') as HTMLInputElement).value,
      message: (document.getElementById('message') as HTMLInputElement).value,
    };

    const serviceID = 'service_dq9mftf';
    const templateID = 'template_nf67ay3';

    emailjs
      .send(serviceID, templateID, params, '9DKWFtLDRvj4w03sQ')
      .then((res) => {
        (document.getElementById('firstName') as HTMLInputElement).value = '';
        (document.getElementById('lastName') as HTMLInputElement).value = '';
        (document.getElementById('email') as HTMLInputElement).value = '';
        (document.getElementById('subject') as HTMLInputElement).value = '';
        (document.getElementById('message') as HTMLInputElement).value = '';
        console.log(res);
        alert('Message sent!');
      })
      .catch((err) => {
        console.log(err);
        alert('System error, kindly try later!');
      });
  }
}
