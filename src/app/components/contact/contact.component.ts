import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { publicKey, serviceID, templateID, templateID1 } from '../../../environments/environment.prod';

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
      message: [''],
    });
  }

  handleFormSubmit() {
    if (this.myForm.valid) {
      this.sendEmailToMe();
      this.sendEmailToClient();
    } else {
      this.showAlert('Form is invalid. Please check your inputs.', 'error');
    }
  }

  sendEmailToMe(): void {
    const params = {
      firstName: (document.getElementById('firstName') as HTMLInputElement).value,
      lastName: (document.getElementById('lastName') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      subject: (document.getElementById('subject') as HTMLInputElement).value,
      message: (document.getElementById('message') as HTMLInputElement).value,
    };

    emailjs
      .send(serviceID, templateID1, params, publicKey)
      .then((res) => {
      })
      ;
  }

  sendEmailToClient(): void {
    const params = {
      firstName: (document.getElementById('firstName') as HTMLInputElement).value,
      lastName: (document.getElementById('lastName') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      subject: (document.getElementById('subject') as HTMLInputElement).value,
      message: (document.getElementById('message') as HTMLInputElement).value,
    };

 

    emailjs
      .send(serviceID, templateID, params, publicKey)
      .then((res) => {
        this.resetForm();
        this.showAlert('Message sent successfully!', 'success');
      })
      .catch((err) => {
        if (err.status == 422) {
          this.showAlert(
            `Entered email is corrupt, kindly check if ${params.email} is correct and try again!`,
            'error'
          );
        } else {
          this.showAlert(
            'System error. Apologies for the inconvenience. Please try again later!',
            'error'
          );
        }
      });
  }

  resetForm() : void{
    (document.getElementById('firstName') as HTMLInputElement).value = '';
    (document.getElementById('lastName') as HTMLInputElement).value = '';
    (document.getElementById('email') as HTMLInputElement).value = '';
    (document.getElementById('subject') as HTMLInputElement).value = '';
    (document.getElementById('message') as HTMLInputElement).value = '';
  }


  showAlert(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;

    setTimeout(() => {
      const alertElement = document.querySelector('.alert-popup');
      if (alertElement) {
        alertElement.classList.add('show');
      }
    }, 100);

    setTimeout(() => {
      this.closeAlert();
    }, 3000); // Auto-close after 3 seconds
  }

  closeAlert() {
    const alertElement = document.querySelector('.alert-popup');
    if (alertElement) {
      alertElement.classList.remove('show');
      setTimeout(() => {
        this.alertMessage = null;
        this.alertType = null;
      }, 300); // Wait for animation to complete before removing content
    }
  }
}
