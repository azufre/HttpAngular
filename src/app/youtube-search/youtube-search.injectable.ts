import { YoutubeSearchService } from '../Service/youtube.service';

let YOUTUBE_API_KEY: string = 'AIzaSyDK7h7WO3tY4E_mzgHIZ-3iLTHJAx3Sejk';
let YOUTUBE_API_URL: string = 'https://www.googleapis.com/youtube/v3/search';

export let youTubeServiceInjectables: Array<any> = [
  {provide: YoutubeSearchService, useClass: YoutubeSearchService},
  {provide: 'YOUTUBE_API_KEY', useValue: YOUTUBE_API_KEY},
  {provide: 'YOUTUBE_API_URL', useValue: YOUTUBE_API_URL}
];
