import { Injectable } from '@angular/core';
import { defer, from } from 'rxjs';
import { delay } from 'rxjs/operators';

import { employees } from './employees';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  getAll() {
    return defer(() => from([employees]).pipe(delay(500)));
  }

  getEmployee(id: string) {
    const employee = employees.find(emp => emp.id === id);
    return defer(() => from([employee]).pipe(delay(500)));
  }
}
