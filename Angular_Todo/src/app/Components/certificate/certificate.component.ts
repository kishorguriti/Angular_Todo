import { Component } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.sass']
})
export class CertificateComponent {
  constructor() { }

  firstname: any;
  lastname: any;
  gender: any;
  address: any;
  field: any;
  mentor: any;
  HeadOfEvent: any;
  date: any;
  formated: any

  ngOnInit() {
    this.formated = moment().format("DD-MM-YYYY");
    // this.date = this.date.format("DD-MM-YYYY")
  }



  onPrint() {
    if (!this.firstname || !this.gender || !this.field || !this.mentor || !this.HeadOfEvent) {
      return
    }
    window.print()
  }

}
