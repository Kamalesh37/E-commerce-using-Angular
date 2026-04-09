import { Component, OnInit } from '@angular/core';

declare var Email: any;

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'https://smtpjs.com/v3/smtp.js';
    document.head.appendChild(script);
  }

  sendEmail(fname: string, lname: string, email: string, phone: string, message: string) {
    if (typeof Email !== 'undefined') {
      Email.send({
        Host : "smtp.gmail.com",
        Username : "kamaleshs2004@gmail.com",
        Password : "kamal485raina",
        To : 'lavanyasuresh3485@gmail.com',
        From : email,
        Subject : "New contact form enquiry from " + fname,
        Body : `Name: ${fname} ${lname}<br>Phone: ${phone}<br>Message: ${message}`
      }).then(
        (msg: string) => alert("Message sent successfully")
      );
    } else {
      alert("Email service isn't loaded yet. Please try again in a moment.");
    }
  }

}
