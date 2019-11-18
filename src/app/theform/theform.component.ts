import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatStepper} from '@angular/material';

@Component({
  selector: 'app-theform',
  templateUrl: './theform.component.html',
  styleUrls: ['./theform.component.css']
})
export class TheformComponent implements OnInit {

  physicianInfoForm: FormGroup;
  @Input() stepper: MatStepper;
  states: string[] = states;

  physicians: Observable<any[]>;
  isLoading: boolean = false;

  constructor(private _formBuilder: FormBuilder, private physicianService: PhysicianService, private priorAuthService: PriorAuthorizationService) {
  }

  ngOnInit() {
    this.physicians = merge(this.physicianInfoForm.controls['firstname'].valueChanges, this.physicianInfoForm.controls['lastname'].valueChanges)
      .pipe(
        debounceTime(300),
        map(v => {
          return {
            "firstname": this.physicianInfoForm.controls['firstname'].value,
            "lastname": this.physicianInfoForm.controls['lastname'].value
          }
        }),
        filter(change => change.firstname.length >= 3 || change.lastname.length >= 3),
        tap(() => this.isLoading = true),
        switchMap(change => this.physicianService.searchPhysician(this.buildPhysicianFilterCriteria(change))
          .pipe(finalize(() => this.isLoading = false),)),
        map(resp => {
          return resp.body;
        })
      );
  }


  buildPhysicianFilterCriteria(change: any): PhysicianFilterCriteria {
    let physician: PhysicianFilterCriteria = new PhysicianFilterCriteria();
    if (change.firstname && change.firstname.length > 0) {
      physician.firstName = change.firstname;
    }

    if (change.lastname && change.lastname.length > 0) {
      physician.lastName = change.lastname;
    }

    return physician;
  }

  setFormData($event: MatAutocompleteSelectedEvent) {
    let physician = $event.option.value;
    if(physician){
      this.physicianInfoForm.controls['firstname'].setValue(physician.firstName, {emitEvent: false});
      this.physicianInfoForm.controls['lastname'].setValue(physician.lastName, {emitEvent: false});
      if(physician.physicianAddress[0]){
        this.physicianInfoForm.controls['address'].setValue(physician.physicianAddress[0].address1, {emitEvent: false});
        this.physicianInfoForm.controls['city'].setValue(physician.physicianAddress[0].city, {emitEvent: false});
        this.physicianInfoForm.controls['phone'].setValue(physician.physicianAddress[0].phone1, {emitEvent: false});
        this.physicianInfoForm.controls['fax'].setValue(physician.physicianAddress[0].fax1, {emitEvent: false});
        this.physicianInfoForm.controls['zip'].setValue(physician.physicianAddress[0].zip, {emitEvent: false});

      }

    }
    console.log(physician);
  }
}
