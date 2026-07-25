import type { TranslationKey } from '@/i18n/translations/en'

export interface ProjectImage {
  id: string
  src: string
  title: string
  caption: string
}

export interface ProjectVideo {
  id: string
  src: string
  rawFilename: string
  titleKey: TranslationKey
  poster: string
}

export const PROJECT_IMAGES: ProjectImage[] = [
  {
    "id": "img-1",
    "src": "./projects/1.jpg",
    "title": "NSS Project Activity #1",
    "caption": "Field operations & logistics execution across regional hubs (#1)"
  },
  {
    "id": "img-2",
    "src": "./projects/2.jpg",
    "title": "NSS Project Activity #2",
    "caption": "Field operations & logistics execution across regional hubs (#2)"
  },
  {
    "id": "img-3",
    "src": "./projects/3.jpg",
    "title": "NSS Project Activity #3",
    "caption": "Field operations & logistics execution across regional hubs (#3)"
  },
  {
    "id": "img-4",
    "src": "./projects/4.jpg",
    "title": "NSS Project Activity #4",
    "caption": "Field operations & logistics execution across regional hubs (#4)"
  },
  {
    "id": "img-5",
    "src": "./projects/5.jpg",
    "title": "NSS Project Activity #5",
    "caption": "Field operations & logistics execution across regional hubs (#5)"
  },
  {
    "id": "img-6",
    "src": "./projects/6.jpg",
    "title": "NSS Project Activity #6",
    "caption": "Field operations & logistics execution across regional hubs (#6)"
  },
  {
    "id": "img-7",
    "src": "./projects/7.jpg",
    "title": "NSS Project Activity #7",
    "caption": "Field operations & logistics execution across regional hubs (#7)"
  },
  {
    "id": "img-8",
    "src": "./projects/8.jpg",
    "title": "NSS Project Activity #8",
    "caption": "Field operations & logistics execution across regional hubs (#8)"
  },
  {
    "id": "img-9",
    "src": "./projects/9.jpg",
    "title": "NSS Project Activity #9",
    "caption": "Field operations & logistics execution across regional hubs (#9)"
  },
  {
    "id": "img-10",
    "src": "./projects/10.jpg",
    "title": "NSS Project Activity #10",
    "caption": "Field operations & logistics execution across regional hubs (#10)"
  },
  {
    "id": "img-11",
    "src": "./projects/11.jpg",
    "title": "NSS Project Activity #11",
    "caption": "Field operations & logistics execution across regional hubs (#11)"
  },
  {
    "id": "img-12",
    "src": "./projects/12.jpg",
    "title": "NSS Project Activity #12",
    "caption": "Field operations & logistics execution across regional hubs (#12)"
  },
  {
    "id": "img-13",
    "src": "./projects/13.jpg",
    "title": "NSS Project Activity #13",
    "caption": "Field operations & logistics execution across regional hubs (#13)"
  },
  {
    "id": "img-14",
    "src": "./projects/14.jpg",
    "title": "NSS Project Activity #14",
    "caption": "Field operations & logistics execution across regional hubs (#14)"
  },
  {
    "id": "img-15",
    "src": "./projects/15.jpg",
    "title": "NSS Project Activity #15",
    "caption": "Field operations & logistics execution across regional hubs (#15)"
  },
  {
    "id": "img-16",
    "src": "./projects/16.jpg",
    "title": "NSS Project Activity #16",
    "caption": "Field operations & logistics execution across regional hubs (#16)"
  },
  {
    "id": "img-17",
    "src": "./projects/17.jpg",
    "title": "NSS Project Activity #17",
    "caption": "Field operations & logistics execution across regional hubs (#17)"
  },
  {
    "id": "img-18",
    "src": "./projects/18.jpg",
    "title": "NSS Project Activity #18",
    "caption": "Field operations & logistics execution across regional hubs (#18)"
  },
  {
    "id": "img-19",
    "src": "./projects/19.jpg",
    "title": "NSS Project Activity #19",
    "caption": "Field operations & logistics execution across regional hubs (#19)"
  },
  {
    "id": "img-20",
    "src": "./projects/20.jpg",
    "title": "NSS Project Activity #20",
    "caption": "Field operations & logistics execution across regional hubs (#20)"
  },
  {
    "id": "img-21",
    "src": "./projects/21.jpg",
    "title": "NSS Project Activity #21",
    "caption": "Field operations & logistics execution across regional hubs (#21)"
  }
];

export const FEATURED_PROJECT_VIDEOS: ProjectVideo[] = [
  {
    id: 'featured-1',
    src: '/projects/featured/top-1.mp4',
    rawFilename: 'top-1.mp4',
    titleKey: 'projects.featured.video.1',
    poster: '/projects/featured/top-1.jpg',
  },
  {
    id: 'featured-2',
    src: '/projects/featured/top-2.mp4',
    rawFilename: 'top-2.mp4',
    titleKey: 'projects.featured.video.2',
    poster: '/projects/featured/top-2.jpg',
  },
  {
    id: 'featured-3',
    src: '/projects/featured/top-3.mp4',
    rawFilename: 'top-3.mp4',
    titleKey: 'projects.featured.video.3',
    poster: '/projects/featured/top-3.jpg',
  },
  {
    id: 'featured-4',
    src: '/projects/featured/top-4.mp4',
    rawFilename: 'top-4.mp4',
    titleKey: 'projects.featured.video.4',
    poster: '/projects/featured/top-4.jpg',
  },
  {
    id: 'featured-5',
    src: '/projects/featured/top-5.mp4',
    rawFilename: 'top-5.mp4',
    titleKey: 'projects.featured.video.5',
    poster: '/projects/featured/top-5.jpg',
  },
];

export const PROJECT_VIDEOS: ProjectVideo[] = [
  {
    "id": "vid-1",
    "src": "./projects/Facebook.mp4",
    "rawFilename": "Facebook.mp4",
    "titleKey": "projects.video.1",
    "poster": "./projects/1.jpg"
  },
  {
    "id": "vid-2",
    "src": "./projects/vid_1.mp4",
    "rawFilename": "vid_1.mp4",
    "titleKey": "projects.video.2",
    "poster": "./projects/2.jpg"
  },
  {
    "id": "vid-3",
    "src": "./projects/vid_2.mp4",
    "rawFilename": "vid_2.mp4",
    "titleKey": "projects.video.3",
    "poster": "./projects/3.jpg"
  },
  {
    "id": "vid-4",
    "src": "./projects/vid_3.mp4",
    "rawFilename": "vid_3.mp4",
    "titleKey": "projects.video.4",
    "poster": "./projects/4.jpg"
  },
  {
    "id": "vid-5",
    "src": "./projects/vid_4.mp4",
    "rawFilename": "vid_4.mp4",
    "titleKey": "projects.video.5",
    "poster": "./projects/5.jpg"
  },
  {
    "id": "vid-6",
    "src": "./projects/vid_5.mp4",
    "rawFilename": "vid_5.mp4",
    "titleKey": "projects.video.6",
    "poster": "./projects/6.jpg"
  },
  {
    "id": "vid-7",
    "src": "./projects/vid_6.mp4",
    "rawFilename": "vid_6.mp4",
    "titleKey": "projects.video.7",
    "poster": "./projects/7.jpg"
  },
  {
    "id": "vid-8",
    "src": "./projects/vid_7.mp4",
    "rawFilename": "vid_7.mp4",
    "titleKey": "projects.video.8",
    "poster": "./projects/8.jpg"
  },
  {
    "id": "vid-9",
    "src": "./projects/vid_8.mp4",
    "rawFilename": "vid_8.mp4",
    "titleKey": "projects.video.9",
    "poster": "./projects/9.jpg"
  },
  {
    "id": "vid-10",
    "src": "./projects/vid_9.mp4",
    "rawFilename": "vid_9.mp4",
    "titleKey": "projects.video.10",
    "poster": "./projects/10.jpg"
  },
  {
    "id": "vid-11",
    "src": "./projects/vid_10.mp4",
    "rawFilename": "vid_10.mp4",
    "titleKey": "projects.video.11",
    "poster": "./projects/11.jpg"
  },
  {
    "id": "vid-12",
    "src": "./projects/vid_11.mp4",
    "rawFilename": "vid_11.mp4",
    "titleKey": "projects.video.12",
    "poster": "./projects/12.jpg"
  },
  {
    "id": "vid-13",
    "src": "./projects/vid_12.mp4",
    "rawFilename": "vid_12.mp4",
    "titleKey": "projects.video.13",
    "poster": "./projects/13.jpg"
  },
  {
    "id": "vid-14",
    "src": "./projects/vid_13.mp4",
    "rawFilename": "vid_13.mp4",
    "titleKey": "projects.video.14",
    "poster": "./projects/14.jpg"
  },
  {
    "id": "vid-15",
    "src": "./projects/vid_14.mp4",
    "rawFilename": "vid_14.mp4",
    "titleKey": "projects.video.15",
    "poster": "./projects/15.jpg"
  },
  {
    "id": "vid-16",
    "src": "./projects/vid_15.mp4",
    "rawFilename": "vid_15.mp4",
    "titleKey": "projects.video.16",
    "poster": "./projects/16.jpg"
  },
  {
    "id": "vid-17",
    "src": "./projects/vid_16.mp4",
    "rawFilename": "vid_16.mp4",
    "titleKey": "projects.video.17",
    "poster": "./projects/17.jpg"
  },
  {
    "id": "vid-18",
    "src": "./projects/vid_17.mp4",
    "rawFilename": "vid_17.mp4",
    "titleKey": "projects.video.18",
    "poster": "./projects/18.jpg"
  },
  {
    "id": "vid-19",
    "src": "./projects/vid_18.mp4",
    "rawFilename": "vid_18.mp4",
    "titleKey": "projects.video.19",
    "poster": "./projects/19.jpg"
  },
  {
    "id": "vid-20",
    "src": "./projects/vid_19.mp4",
    "rawFilename": "vid_19.mp4",
    "titleKey": "projects.video.20",
    "poster": "./projects/20.jpg"
  },
  {
    "id": "vid-21",
    "src": "./projects/vid_20.mp4",
    "rawFilename": "vid_20.mp4",
    "titleKey": "projects.video.21",
    "poster": "./projects/21.jpg"
  },
  {
    "id": "vid-22",
    "src": "./projects/vid_21.mp4",
    "rawFilename": "vid_21.mp4",
    "titleKey": "projects.video.22",
    "poster": "./projects/1.jpg"
  },
  {
    "id": "vid-23",
    "src": "./projects/vid_22.mp4",
    "rawFilename": "vid_22.mp4",
    "titleKey": "projects.video.23",
    "poster": "./projects/2.jpg"
  },
  {
    "id": "vid-24",
    "src": "./projects/vid_23.mp4",
    "rawFilename": "vid_23.mp4",
    "titleKey": "projects.video.24",
    "poster": "./projects/3.jpg"
  },
  {
    "id": "vid-25",
    "src": "./projects/vid_24.mp4",
    "rawFilename": "vid_24.mp4",
    "titleKey": "projects.video.25",
    "poster": "./projects/4.jpg"
  }
];
