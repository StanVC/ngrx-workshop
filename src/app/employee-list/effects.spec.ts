import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';

import { EmployeesEffects } from './effects';
import { EmployeeService } from '../services/employee.service';
import {
  fetchEmployees,
  fetchEmployeesSuccess,
  fetchEmployeesError,
} from './actions';
import { Employee } from '../models/employee.model';

describe('EmployeesEffects', () => {
  let effects: EmployeesEffects;
  let actions$: Observable<any>;

  let snackbar: jasmine.SpyObj<MatSnackBar>;
  let empService: jasmine.SpyObj<EmployeeService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmployeesEffects,
        provideMockActions(() => actions$),
        {
          provide: MatSnackBar,
          useValue: jasmine.createSpyObj('MatSnackBar', ['open']),
        },
        {
          provide: EmployeeService,
          useValue: jasmine.createSpyObj('MatSnackBar', ['getAll']),
        },
      ],
    });

    effects = TestBed.get(EmployeesEffects);
    snackbar = TestBed.get(MatSnackBar);
    empService = TestBed.get(EmployeeService);
  });

  describe('loadEmployees$', () => {
    it('should load employees', () => {
      const emp1 = { id: '1' } as Employee;
      const emp2 = { id: '2' } as Employee;
      const employees = [emp1, emp2];

      actions$ = hot('-a', { a: fetchEmployees() });
      const expected = cold('-c', {
        c: fetchEmployeesSuccess({ employees }),
      });

      const response = cold('b', { b: employees });
      empService.getAll.and.returnValue(response);

      effects.loadEmployees$.subscribe(console.log);

      expect(effects.loadEmployees$).toBeObservable(expected);
    });

    it('should handle errors', () => {
      actions$ = hot('-a', { a: fetchEmployees() });
      const response = cold('#', null, 'Server Error');
      empService.getAll.and.returnValue(response);

      const expected = cold('-c', { c: fetchEmployeesError() });

      expect(effects.loadEmployees$).toBeObservable(expected);
    });
  });
});
