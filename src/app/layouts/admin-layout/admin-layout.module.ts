import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { MatButtonModule, MatInputModule, MatRippleModule, MatFormFieldModule,
  MatTooltipModule, MatSelectModule, ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TributoModule } from 'app/contactos/contactos.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PipesModule } from '../../pipes/pipes.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ShowErrorsDirective } from '../../directivas/show-errors.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgxMatSelectSearchModule,
    HttpClientModule,
    TributoModule,
    PipesModule,
    NgxSpinnerModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    NgxSmartModalModule.forRoot(),
  ],
  declarations: [
    UserProfileComponent,
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})

export class AdminLayoutModule {}
