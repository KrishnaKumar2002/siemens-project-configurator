import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { describe, it, expect, beforeEach } from 'vitest';
import { App } from './app';
import { ThemeService } from './core/services/theme.service';

// ── Browser API stubs for JSDOM ─────────────────────────────────────────────

if (typeof globalThis.IntersectionObserver === 'undefined') {
  (globalThis as any).IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (typeof globalThis.ResizeObserver === 'undefined') {
  (globalThis as any).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// ── Tests ───────────────────────────────────────────────────────────────────

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Import App directly — NO_ERRORS_SCHEMA suppresses unknown si-* element errors
      // AND unknown property binding errors from Element components
      imports: [App],
      providers: [
        provideRouter([]),
        ThemeService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    // Override the App's own imports to remove Element components that have
    // unsatisfiable DI dependencies in the JSDOM test environment.
    // We keep CommonModule + FormsModule so Angular form logic still works.
    .overrideComponent(App, {
      set: {
        imports: [CommonModule, FormsModule],
        schemas: [NO_ERRORS_SCHEMA],
      }
    })
    .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have Console Dashboard as the first nav item', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    // NavbarVerticalItem uses 'label' property (not 'title') in Element v49
    expect((app.navItems[0] as any).label).toBe('Console Dashboard');
  });

  it('should default reconfigure connectivity to No', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.formData.reconfigureConnectivity).toBe('No');
  });
});
