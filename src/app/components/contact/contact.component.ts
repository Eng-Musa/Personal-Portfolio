import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { publicKey, serviceID, templateID, templateID1 } from '../../../environments/environment.prod';
import {ToastrService} from "ngx-toastr";

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

  constructor(private fb: FormBuilder, private toaster:ToastrService) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      message: [''],
    });
  }

  valid(): boolean {
    const { firstName, lastName, email, message } = this.myForm.value;

    if (firstName.length > 1 && lastName.length > 1 && email.length > 1 && message.length > 1) {
      return true;
    }

    return false;
  }

  handleFormSubmit() {
    if (this.valid()) {
      this.sendEmailToMe();
      this.sendEmailToClient();
    } else {
      this.toaster.error(`Kindly fill all the required fields!`, 'Error', {
        timeOut: 5000, // Increased time to make it more visible
        progressBar: true, // Add a progress bar
        progressAnimation: "decreasing",
        positionClass: "toast-top-center", // Corrected position class
        closeButton: true, // Add a close button
        newestOnTop: true, // Makes sure the newest toast appears on top
        tapToDismiss: true, // Allows dismissing on click
      })
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
        this.toaster.success(`Message sent successfully!`, 'Success', {
          timeOut: 5000, // Increased time to make it more visible
          progressBar: true, // Add a progress bar
          progressAnimation: "decreasing",
          positionClass: "toast-top-center", // Corrected position class
          closeButton: true, // Add a close button
          newestOnTop: true, // Makes sure the newest toast appears on top
          tapToDismiss: true, // Allows dismissing on click
        })
      })
      .catch((err) => {
        if (err.status == 422) {
          this.toaster.error(`Entered email is corrupt, kindly check if email: ${params.email} is correct and try again!`, 'Error', {
            timeOut: 5000, // Increased time to make it more visible
            progressBar: true, // Add a progress bar
            progressAnimation: "decreasing",
            positionClass: "toast-top-center", // Corrected position class
            closeButton: true, // Add a close button
            newestOnTop: true, // Makes sure the newest toast appears on top
            tapToDismiss: true, // Allows dismissing on click
          })
        } else {
          this.toaster.error("Network error. Apologies for the inconvenience. Please try again later!", 'Error', {
            timeOut: 5000, // Increased time to make it more visible
            progressBar: true, // Add a progress bar
            progressAnimation: "decreasing",
            positionClass: "toast-top-center", // Corrected position class
            closeButton: true, // Add a close button
            newestOnTop: true, // Makes sure the newest toast appears on top
            tapToDismiss: true, // Allows dismissing on click
          });

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

}
