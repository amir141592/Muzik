export interface Song {
  id: string;
  type: 'SINGLE' | 'ALBUM';
  parentalAdvisory: boolean;
  title: string;
  artist: string;
  coArtists: string[];
  album: string;
  image: string;
  file: string;
}
