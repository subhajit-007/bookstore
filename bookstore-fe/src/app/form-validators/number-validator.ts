import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = !isNaN(Number(control.value));
    return isValid ? null : { notNumber: { value: control.value } };
  };
}
