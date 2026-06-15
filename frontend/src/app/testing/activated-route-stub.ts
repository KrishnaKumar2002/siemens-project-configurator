import { Component, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ActivatedRouteStub {
  readonly snapshot = {};
  readonly paramMap = new Map();
  readonly queryParamMap = new Map();
  readonly params = {};
  readonly queryParams = {};
  readonly url = '';
  readonly routeConfig = null;
}

@Component({
  // Kept for compatibility if tests need a component import later.
  selector: 'app-activated-route-stub',
  template: ''
})
export class ActivatedRouteStubComponent {}

export const activatedRouteStubProvider = {
  provide: ActivatedRoute,
  useClass: ActivatedRouteStub
};

