
import { Character } from './Character';


export interface RespRickAndMorty {
  info:    Info;
  results: Character[];
}

export interface Info {
  count: number;
  pages: number;
  next:  string;
  prev:  null;
}
