import { AbstractControl, FormGroup } from '@angular/forms';

export class ValidatorField {

  // Validador para verificar se dois campos combinam (match)
  static MustMatch(controlName: string, matchingControlName: string): any {
      return (group: AbstractControl) => {
          const formGroup = group as FormGroup;
          const control = formGroup.controls[controlName];
          const matchingControl = formGroup.controls[matchingControlName];

          if (matchingControl.errors && !matchingControl.errors.mustMatch) {
              // retorna se outro validador já encontrou um erro no matchingControl
              return null;
          }

          // dá erro no matchingControl se a validação falhar
          if (control.value !== matchingControl.value) {
              matchingControl.setErrors({ mustMatch: true });
          } else {
              matchingControl.setErrors(null);
          }

          return null;
      };
  }
}
