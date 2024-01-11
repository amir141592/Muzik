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
              title: 'manam oon ke maghroor',
              artist: 'shayea',
              image: 'http://localhost/image/manam-oon-ke-maghroor',
            },
            {
              id: '2',
              title: 'miri too lak',
              artist: 'reza pishro (ft. ho3ein)',
              image: 'http://localhost/image/miri-too-lak',
            },
            {
              id: '3',
              title: 'gangesh balas',
              artist: 'sohrab mj',
              image: 'http://localhost/image/gangesh-balas',
            },
            {
              id: '4',
              title: 'paghadam',
              artist: 'alireza talischi',
              image: 'http://localhost/image/paghadam',
            },
            {
              id: '5',
              title: 'bi ehsas (Instrumental)',
              artist: 'shadmehr aghili',
              image: 'http://localhost/image/bi-ehsas-instrumental',
            },
            {
              id: '6',
              title: 'ghabe akse khali',
              artist: 'sirvan khosravi',
              image: 'http://localhost/image/ghabe-akse-khali',
            },
            {
              id: '7',
              title: 'nagi ke nagoftam',
              artist: 'farzad farzin',
              image: 'http://localhost/image/nagi-ke-nagoftam',
            },
          ],
          topTracks: [
            {
              id: '8',
              title: 'ghermez',
              artist: 'garsha rezaei',
              image: 'http://localhost/image/ghermez',
            },
            {
              id: '9',
              title: 'ba toam',
              artist: 'naser zeynali',
              image: 'http://localhost/image/ba-toam',
            },
            {
              id: '10',
              title: 'shookhi nadaram',
              artist: 'shohrab pakzad (ft. asef aria)',
              image: 'http://localhost/image/shookhi-nadaram',
            },
            {
              id: '11',
              title: 'dastan',
              artist: 'asef aria',
              image: 'http://localhost/image/dastan',
            },
            {
              id: '12',
              title: 'roze sefid',
              artist: 'haamim',
              image: 'http://localhost/image/roze-sefid',
            },
            {
              id: '13',
              title: 'yelkhi',
              artist: 'shayea',
              image: 'http://localhost/image/yelkhi',
            },
            {
              id: '14',
              title: 'vel kon',
              artist: 'shayea',
              image: 'http://localhost/image/vel-kon',
            },
          ],
          newReleases: [
            {
              id: '15',
              title: '',
              artist: '',
              image: 'http://localhost/image/',
            },
            {
              id: '16',
              title: '',
              artist: '',
              image: 'http://localhost/image/',
            },
            {
              id: '17',
              title: '',
              artist: '',
              image: 'http://localhost/image/',
            },
            {
              id: '18',
              title: '',
              artist: '',
              image: 'http://localhost/image/',
            },
            {
              id: '19',
              title: '',
              artist: '',
              image: 'http://localhost/image/',
            },
            {
              id: '20',
              title: '',
              artist: '',
              image: 'http://localhost/image/',
            },
            {
              id: '21',
              title: '',
              artist: '',
              image: 'http://localhost/image/',
            },
          ],
        };
      })
      .listen(3000);

    console.log(
      `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
    );
  })
  .catch((error) => console.error(error));
