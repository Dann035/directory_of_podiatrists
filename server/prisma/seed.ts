import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@podiatrists.com' },
    update: {},
    create: {
      email: 'admin@podiatrists.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create practitioners
  const practitioners = [
    {
      name: 'Dr. Juan Pérez',
      slug: 'dr-juan-perez',
      bio: 'Especialista en biomecánica y tratamiento de uñas encarnadas con más de 15 años de experiencia.',
      clinicAddress: 'Calle Gran Vía 28',
      city: 'Madrid',
      postalCode: '28013',
      phone: '+34 912 345 678',
      email: 'juan.perez@podologia.com',
      licenseNumber: 'POD-MAD-001',
      verified: true,
      latitude: 40.4168,
      longitude: -3.7038,
      rating: 4.8,
      reviewCount: 45,
    },
    {
      name: 'Dra. María Gómez',
      slug: 'dra-maria-gomez',
      bio: 'Podóloga especializada en pie diabético y ortopedia. Atención personalizada y tratamientos innovadores.',
      clinicAddress: 'Passeig de Gracia 89',
      city: 'Barcelona',
      postalCode: '08008',
      phone: '+34 934 567 890',
      email: 'maria.gomez@podologia.com',
      licenseNumber: 'POD-BCN-002',
      verified: true,
      latitude: 41.3874,
      longitude: 2.1686,
      rating: 4.9,
      reviewCount: 62,
    },
    {
      name: 'Dr. Carlos Rodríguez',
      slug: 'dr-carlos-rodriguez',
      bio: 'Experto en fascitis plantar y estudios de la marcha. Tecnología avanzada para diagnóstico preciso.',
      clinicAddress: 'Calle Colón 15',
      city: 'Valencia',
      postalCode: '46004',
      phone: '+34 963 456 789',
      email: 'carlos.rodriguez@podologia.com',
      licenseNumber: 'POD-VAL-003',
      verified: true,
      latitude: 39.4699,
      longitude: -0.3763,
      rating: 4.7,
      reviewCount: 38,
    },
    {
      name: 'Dra. Ana Martínez',
      slug: 'dra-ana-martinez',
      bio: 'Especialista en plantillas personalizadas y corrección postural. Enfoque preventivo y terapéutico.',
      clinicAddress: 'Avenida de la Constitución 12',
      city: 'Sevilla',
      postalCode: '41001',
      phone: '+34 954 321 098',
      email: 'ana.martinez@podologia.com',
      licenseNumber: 'POD-SEV-004',
      verified: true,
      latitude: 37.3891,
      longitude: -5.9845,
      rating: 4.6,
      reviewCount: 29,
    },
    {
      name: 'Dr. Luis Fernández',
      slug: 'dr-luis-fernandez',
      bio: 'Podólogo deportivo especializado en lesiones de atletas y prevención de patologías del pie.',
      clinicAddress: 'Calle Uría 32',
      city: 'Oviedo',
      postalCode: '33003',
      phone: '+34 985 234 567',
      email: 'luis.fernandez@podologia.com',
      licenseNumber: 'POD-OVI-005',
      verified: false,
      latitude: 43.3619,
      longitude: -5.8494,
      rating: 4.5,
      reviewCount: 18,
    },
  ];

  for (const practitionerData of practitioners) {
    const practitioner = await prisma.professional.upsert({
      where: { slug: practitionerData.slug },
      update: {},
      create: practitionerData,
    });
    console.log(`✅ Practitioner created: ${practitioner.name}`);

    // Create services for each practitioner
    const services = [
      {
        professionalId: practitioner.id,
        title: 'Tratamiento de uñas encarnadas',
        description:
          'Tratamiento profesional para uñas encarnadas con técnicas mínimamente invasivas.',
        price: 45.0,
        durationMinutes: 30,
      },
      {
        professionalId: practitioner.id,
        title: 'Estudio de la marcha',
        description:
          'Análisis biomecánico completo de la marcha con tecnología avanzada.',
        price: 80.0,
        durationMinutes: 60,
      },
      {
        professionalId: practitioner.id,
        title: 'Plantillas personalizadas',
        description: 'Diseño y fabricación de plantillas ortopédicas a medida.',
        price: 120.0,
        durationMinutes: 45,
      },
    ];

    await prisma.service.createMany({
      data: services,
      skipDuplicates: true,
    });

    // Create reviews
    const reviews = [
      {
        professionalId: practitioner.id,
        rating: 5,
        comment:
          'Excelente profesional, muy atento y resolvió mi problema rápidamente.',
      },
      {
        professionalId: practitioner.id,
        rating: 4,
        comment: 'Buen servicio, instalaciones limpias y modernas.',
      },
      {
        professionalId: practitioner.id,
        rating: 5,
        comment:
          'Muy recomendable, explicaciones claras y tratamiento efectivo.',
      },
    ];

    await prisma.review.createMany({
      data: reviews,
      skipDuplicates: true,
    });
  }

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
