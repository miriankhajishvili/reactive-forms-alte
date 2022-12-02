import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    active: new FormControl('', [Validators.requiredTrue]),
    userContactInfo: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(124),
      ]),
    }),
    experience: new FormArray([]),
  });

  get experienceFormArray() {
    return <FormArray>this.form.get('experience');
  }

  addExperiance() {
    // const experience = <FormArray>this.form.get('experience')
    this.experienceFormArray.push(
      new FormGroup({
        company: new FormControl('', [Validators.required]),
        years: new FormControl('', [Validators.required]),
      })
    );
  }

  removeExperience(i: number) {
    this.experienceFormArray.removeAt(i);
  }

  submit() {
    this.form.markAllAsTouched();
  }

  ngOnInit(): void {
    const user = {
      firstname: 'Mirian',
      lastname: 'Khajishvili',
      active: true,
      email: 'Mirian.khajishvili@gmail.com',
      phone: '+995 595 58 04 04',
      experience: [
        {
          company: 'alte',
          years: '3',
        },
      ],
    };
    user.experience.forEach(() => this.addExperiance());

    this.form.patchValue({});

    // this.form.valueChanges.subscribe((form)=>{
    //   console.log(form)
    // })

    this.form.get('firstname')?.valueChanges.subscribe((value) => {
      console.log(value);

      this.form.get('lastname')?.disable();
      this.form.get('active')?.setValue(false);
      this.form.get('userContactInfo')?.clearValidators()
    });
  }
}
