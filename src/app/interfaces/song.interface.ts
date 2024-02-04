export interface Song {
  id: string;
  type: 'SINGLE' | 'ALBUM' | 'VIDEO';
  parentalAdvisory: boolean;
  title: string;
  artist: string;
  coArtists: string[];
  album: string;
  image: string;
  file: string;
}
