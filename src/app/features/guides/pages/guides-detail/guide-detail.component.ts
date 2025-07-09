import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GuidesService } from '../../services/guides.service';
import { Guide } from '../../model/guide.model';

/**
 * GuideDetailComponent displays the full information of a specific plant care guide.
 * It fetches the guide details based on the route parameter (`id`) and renders the data.
 */
@Component({
    selector: 'app-guide-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './guide-detail.component.html',
    styleUrls: ['./guide-detail.component.css']
})
export class GuideDetailComponent implements OnInit {
    /** Stores the retrieved guide data */
    guide!: Guide;

    /** ID of the guide extracted from the route */
    guideId!: number;

    /**
     * Injects services needed to access route parameters, navigate programmatically,
     * and retrieve guide data from the backend.
     * @param route - ActivatedRoute for accessing the current route parameters
     * @param router - Angular Router for navigation
     * @param guideService - Service used to fetch guide data
     */
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private guideService: GuidesService
    ) {}

    /**
     * Lifecycle hook called after component initialization.
     * Extracts the guide ID from the route and loads the corresponding guide.
     */
    ngOnInit(): void {
        this.guideId = Number(this.route.snapshot.paramMap.get('id'));
        this.loadGuide();
    }

    /**
     * Loads the guide data using the GuidesService based on `guideId`.
     * Updates the local `guide` property when data is received.
     */
    loadGuide(): void {
        this.guideService.getGuideById(this.guideId).subscribe(data => this.guide = data);
    }
}
