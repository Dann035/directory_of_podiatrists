import { Injectable } from '@nestjs/common';

export type Practitioner = {
  id: string;
  nombre: string;
  ciudad?: string;
  direccion?: string;
  telefono?: string;
  especialidades?: string[];
};

@Injectable()
export class PractitionersService {
  private items: Practitioner[] = [
    {
      id: '1',
      nombre: 'Dr. Juan Pérez',
      ciudad: 'Madrid',
      direccion: 'Calle Falsa 123',
      telefono: '+34123456789',
      especialidades: ['Uñas', 'Biomecánica'],
    },
    {
      id: '2',
      nombre: 'Dra. María Gómez',
      ciudad: 'Barcelona',
      direccion: 'Passeig de Gracia 1',
      telefono: '+34987654321',
      especialidades: ['Ortopedia'],
    },
  ];

  findAll(): Practitioner[] {
    return this.items;
  }

  findOne(id: string): Practitioner | undefined {
    return this.items.find((i) => i.id === id);
  }

  search(q: string): Practitioner[] {
    const term = q?.toLowerCase?.() || '';
    return this.items.filter(
      (p) =>
        p.nombre.toLowerCase().includes(term) ||
        p.ciudad?.toLowerCase().includes(term) ||
        p.especialidades?.some((s) => s.toLowerCase().includes(term)),
    );
  }
}
