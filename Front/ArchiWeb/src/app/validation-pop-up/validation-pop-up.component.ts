import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-validation-pop-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './validation-pop-up.component.html',
  styleUrl: './validation-pop-up.component.css'
})
export class ValidationPopUpComponent {

  validationTicket : FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, public dialogRef: MatDialogRef<ValidationPopUpComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.validationTicket = this.fb.group({
      choice: ['', Validators.required]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if(this.validationTicket.valid){
      const userData = {
        _id: this.data.id,
        etats_d: this.validationTicket.value.choice,
      };
      const headers = new HttpHeaders()
      this.http.put('http://localhost:5000/reponseDemande', userData, {headers})
        .subscribe(
          response => {
            console.log('ticket traité avec succès', response);
            this.close();
            window.location.reload();
          },
          error => {
            console.error('Erreur lors du traitement du ticket', error);
          }
        );
    }
  }
}
