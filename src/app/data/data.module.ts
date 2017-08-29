import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataComponent } from './data.component';

import { DataRoutingModule } from './data-routing.module';

@NgModule({
    imports: [
        CommonModule,
        DataRoutingModule,
    ],
    declarations: [DataComponent],
})
export class DataModule { }