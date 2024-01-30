import { Elysia } from 'elysia';

import { mongooseConnection } from './databases/mongodb.database';

mongooseConnection
  .then(() => {
    console.log('connected to mongoDB');

    const app = new Elysia()
      .onError(({ error }) => console.log(error))
      .get('/', () => 'Hello Elysia')
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
      .get('/muziks', () => {
        return {
          recommended: [
            {
              id: '1',
              type: 'ALBUM',
              title: 'manam oon ke maghroor',
              artist: 'shayea',
              coArtists: [],
              album: 'injaneb',
            },
            {
              id: '2',
              type: 'SINGLE',
              title: 'miri too lak',
              artist: 'reza pishro',
              coArtists: ['ho3ein'],
              album: '',
            },
            {
              id: '3',
              type: 'SINGLE',
              title: 'gangesh balas',
              artist: 'sohrab mj',
              coArtists: [],
              album: '',
            },
            {
              id: '4',
              type: 'SINGLE',
              title: 'paghadam',
              artist: 'alireza talischi',
              coArtists: [],
              album: '',
            },
            {
              id: '5',
              type: 'SINGLE',
              title: 'bi ehsas (Instrumental)',
              artist: 'shadmehr aghili',
              coArtists: [],
              album: '',
            },
            {
              id: '6',
              type: 'SINGLE',
              title: 'ghabe akse khali',
              artist: 'sirvan khosravi',
              coArtists: [],
              album: '',
            },
            {
              id: '7',
              type: 'SINGLE',
              title: 'nagi ke nagoftam',
              artist: 'farzad farzin',
              coArtists: [],
              album: '',
            },
          ],
          topTracks: [
            {
              id: '8',
              type: 'SINGLE',
              title: 'ghermez',
              artist: 'garsha rezaei',
              coArtists: [],
              album: '',
            },
            {
              id: '9',
              type: 'SINGLE',
              title: 'ba toam',
              artist: 'naser zeynali',
              coArtists: [],
              album: '',
            },
            {
              id: '10',
              type: 'SINGLE',
              title: 'shookhi nadaram',
              artist: 'shohrab pakzad',
              coArtists: ['asef aria'],
              album: '',
            },
            {
              id: '11',
              type: 'SINGLE',
              title: 'dastan',
              artist: 'asef aria',
              coArtists: [],
              album: '',
            },
            {
              id: '12',
              title: 'roze sefid',
              artist: 'haamim',
              coArtists: [],
              album: '',
            },
            {
              id: '13',
              type: 'ALBUM',
              title: 'yelkhi',
              artist: 'shayea',
              coArtists: ['zaal'],
              album: 'amadebash',
            },
            {
              id: '14',
              type: 'ALBUM',
              title: 'vel kon',
              artist: 'shayea',
              coArtists: [],
              album: 'amadebash',
            },
          ],
          // newReleases: [
          //   {
          //     id: '15',
          //     title: '',
          //     artist: '',
          //   },
          //   {
          //     id: '16',
          //     title: '',
          //     artist: '',
          //   },
          //   {
          //     id: '17',
          //     title: '',
          //     artist: '',
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
        };
      })
      .listen(3000);

    console.log(
      `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
    );
  })
  .catch((error) => console.error(error));
