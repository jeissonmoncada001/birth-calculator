export interface FechaItem {
  id: number;
  date: Date | string;
}

export interface Usuario {
  id: number;
  Nombre: string;
  DiadeOvulacion: Date;
  Diasdeinsemiacion: FechaItem[];
  PartosProbables: FechaItem[];
  DiaDeParto: Date;
}
