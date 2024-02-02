import { Elysia } from 'elysia';

import { mongooseConnection } from './databases/mongodb.database';

mongooseConnection
  .then(() => {
    console.log('connected to mongoDB');

    const app = new Elysia()
      .onError(({ error }) => console.log(error))
      .onStart(() =>
        console.log(`🦊 Elysia is running at http://localhost:3000`)
      )
      .get('/', () => 'Hello Amir')
      .get('/image/:name', ({ params: { name } }) => {
        return Bun.file(import.meta.dir + `/content/image/${name}`);
      })
      .get('/user-info', () => {
        return {
          id: '1',
          firstName: 'Amir',
          lastName: 'Allahdadian',
          email: 'amir.allahdadian@gmail.com',
        };
      })
      .get('/user-image', () =>
        Bun.file('./server/content/image/amir-image.jpg')
      )
      .get('/muziks/home/recommended', () => [
        {
          id: '1',
          type: 'ALBUM',
          title: 'manam oon ke maghroor',
          artist: 'shayea',
          coArtists: [],
          album: 'injaneb',
          image: 'http://localhost:3000/image/shayea_injaneb.webp',
        },
        {
          id: '2',
          type: 'SINGLE',
          title: 'miri tu lak',
          artist: 'reza pishro',
          coArtists: ['ho3ein'],
          album: '',
          image: 'http://localhost:3000/image/reza-pishro_miri-tu-lak.webp',
        },
        {
          id: '3',
          type: 'SINGLE',
          title: 'gangesh balas',
          artist: 'sohrab MJ',
          coArtists: [],
          album: '',
          image: 'http://localhost:3000/image/sohrab-mj_gangesh-balas.webp',
        },
        {
          id: '4',
          type: 'SINGLE',
          title: 'paghadam',
          artist: 'alireza talischi',
          coArtists: [],
          album: '',
          image: 'http://localhost:3000/image/alireza-talischi_paghadam.webp',
        },
        {
          id: '5',
          type: 'SINGLE',
          title: 'bi ehsas (instrumental)',
          artist: 'shadmehr aghili',
          coArtists: [],
          album: '',
          image:
            'http://localhost:3000/image/shadmehr-aghili_bi-ehsas-instrumental.webp',
        },
        {
          id: '6',
          type: 'SINGLE',
          title: 'ghabe akse khali',
          artist: 'sirvan khosravi',
          coArtists: [],
          album: '',
          image:
            'http://localhost:3000/image/sirvan-khosravi_ghabe-akse-khali.webp',
        },
        {
          id: '7',
          type: 'SINGLE',
          title: 'nagi ke nagoftam',
          artist: 'farzad farzin',
          coArtists: [],
          album: '',
          image:
            'http://localhost:3000/image/farzad-farzin_nagi-ke-nagoftam.webp',
        },
      ])
      .get('/muziks/home/top-tracks', () => [
        {
          id: '8',
          type: 'SINGLE',
          title: 'ghermez',
          artist: 'garsha rezaei',
          coArtists: [],
          album: '',
          image: 'http://localhost:3000/image/garsha-rezaei_ghermez.webp',
        },
        {
          id: '9',
          type: 'SINGLE',
          title: 'ba toam',
          artist: 'naser zeynali',
          coArtists: [],
          album: '',
          image: 'http://localhost:3000/image/naser-zeynali_ba-toam.webp',
        },
        {
          id: '10',
          type: 'SINGLE',
          title: 'shookhi nadaram',
          artist: 'sohrab pakzad',
          coArtists: ['asef aria'],
          album: '',
          image:
            'http://localhost:3000/image/sohrab-pakzad_shookhi-nadaram.webp',
        },
        {
          id: '11',
          type: 'SINGLE',
          title: 'dastan',
          artist: 'asef aria',
          coArtists: [],
          album: '',
          image: 'http://localhost:3000/image/asef-aria_dastan.webp',
        },
        {
          id: '12',
          type: 'SINGLE',
          title: 'vasalam',
          artist: 'macan band',
          coArtists: [],
          album: '',
          image: 'http://localhost:3000/image/macan-band_vasalam.webp',
        },
        {
          id: '13',
          type: 'ALBUM',
          title: 'yelkhi',
          artist: 'shayea',
          coArtists: ['zaal'],
          album: 'amadebash',
          image: 'http://localhost:3000/image/shayea_amadebash.webp',
        },
        {
          id: '14',
          type: 'ALBUM',
          title: 'vel kon',
          artist: 'shayea',
          coArtists: ['amir khalvat'],
          album: 'amadebash',
          image: 'http://localhost:3000/image/shayea_amadebash.webp',
        },
      ])
      .listen(3000);
  })
  .catch((error) => console.error(error));

// newReleases: [
//   {
//     id: '15',
//     title: 'shodi eshgham',
//     artist: 'meysam ebrahimi',
//   },
//   {
//     id: '16',
//     title: 'gole niloofar',
//     artist: 'ragheb',
//   },
//   {
//     id: '17',
//     title: 'hala hey',
//     artist: 'armin zareei',
//   },
//   {
//     id: '18',
//     title: '',
//     artist: '',
//   },
//   {
//     id: '19',
//     title: '',
//     artist: '',
//   },
//   {
//     id: '20',
//     title: '',
//     artist: '',
//   },
//   {
//     id: '21',
//     title: '',
//     artist: '',
//   },
// ],
