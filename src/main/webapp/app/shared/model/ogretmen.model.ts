import { ISinif } from 'app/shared/model/sinif.model';
import { Brans } from 'app/shared/model/enumerations/brans.model';

export interface IOgretmen {
  id?: number;
  adiSoyadi?: string | null;
  brans?: Brans | null;
  sinif?: ISinif | null;
}

export const defaultValue: Readonly<IOgretmen> = {};
