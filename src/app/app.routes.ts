import { Routes } from '@angular/router';
import { SummaryComponent } from './components/summary/summary.component';
import { ResumeComponent } from './components/resume/resume.component';

export const routes: Routes = [
    {path:'', redirectTo:'summary', pathMatch:'full'},
    {path:'summary', component:SummaryComponent},
    {path:'resume', component:ResumeComponent}
];
