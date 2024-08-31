import { Routes } from '@angular/router';
import { SummaryComponent } from './components/summary/summary.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
    {path:'', redirectTo:'summary', pathMatch:'full'},
    {path:'summary', component:SummaryComponent},
    {path:'resume', component:ResumeComponent},
    {path:'projects', component:ProjectsComponent},
    {path:'contact', component:ContactComponent}
];
