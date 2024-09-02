import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  myForm!: FormGroup;

  alertMessage: string | null = null;
  alertType: 'success' | 'error' | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      message: ['']
    });
  }

  handleFormSubmit() {
    if (this.myForm.valid) {
      this.sendEmailToMe();
      this.sendEmailToClient();
    } else {
      this.alertMessage = 'Form is invalid. Please check your inputs.';
      this.alertType = 'error';
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
        this.alertMessage = 'Message sent successfully!';
        this.alertType = 'success';
      })
      .catch((err) => {
        console.log(err);
        // alert(`System error, kindly check if ${params.email} is correct and try again!`);
        this.alertMessage = `System error, kindly check if ${params.email} is correct and try again!`;
        this.alertType = 'error';
      });
  }
}
