import { IOgretmen } from 'app/shared/model/ogretmen.model';
import { IOgrenci } from 'app/shared/model/ogrenci.model';
import { Brans } from 'app/shared/model/enumerations/brans.model';

export interface ISinif {
  id?: number;
  sinifAdi?: string | null;
  sinifKodu?: string | null;
  brans?: Brans | null;
  ogretmen?: IOgretmen | null;
  ogrencis?: IOgrenci[] | null;
}

export const defaultValue: Readonly<ISinif> = {};
