export interface Song {
  id: string;
  type: 'SINGLE' | 'ALBUM' | 'VIDEO';
  title: string;
  artist: string;
  coArtists: string[];
  album: string;
  image: string;
}
