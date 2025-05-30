import { OnInit, OnDestroy, Directive } from '@angular/core';

@Directive() // ✅ Use @Directive instead of @Component (no template needed)
export abstract class BaseComponent implements OnInit, OnDestroy {
  data: any[] = [];

  constructor() {
    console.log('BaseComponent Initialized');
  }

  ngOnInit(): void {
    console.log('BaseComponent OnInit');
    this.loadData(); // Common method
  }

  ngOnDestroy(): void {
    console.log('BaseComponent Destroyed');
  }

  loadData() {
    console.log('Loading common data...');
    this.data = ['Item1', 'Item2', 'Item3']; // Example logic
  }
}