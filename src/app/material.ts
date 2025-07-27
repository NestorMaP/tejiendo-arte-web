import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
// añade más módulos según lo necesites

export const materialProviders = [
  provideAnimations(),
  importProvidersFrom(MatButtonModule, MatToolbarModule)
];