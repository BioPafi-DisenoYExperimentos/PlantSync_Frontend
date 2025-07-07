import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GuidesService } from '../../services/guides.service';
import { Guide } from '../../model/guide.model';
import { LanguageService} from "../../../../shared/services/language.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mis-guias',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-guides.component.html',
  styleUrls: ['./my-guides.component.css']
})
export class MyGuidesComponent implements OnInit, OnDestroy {
  guides: Guide[] = [];
  title: string = '';
  private langSub?: Subscription;

  constructor(
      private guideService: GuidesService,
      private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.guideService.getGuides().subscribe(data => this.guides = data);

    // Establece título inicial según idioma actual
    this.title = this.languageService.getLabel('guides', 'title');

    // Suscripción para reaccionar a futuros cambios de idioma
    this.langSub = this.languageService.lang$.subscribe(() => {
      this.title = this.languageService.getLabel('guides', 'title');
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }
}
