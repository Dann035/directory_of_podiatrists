import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SearchPractitionersDto } from './dto/search-practitioners.dto';
import { CreatePractitionerDto } from './dto/create-practitioner.dto';
import { UpdatePractitionerDto } from './dto/update-practitioner.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PractitionersService {
  constructor(private prisma: PrismaService) { }

  async search(searchDto: SearchPractitionersDto) {
    const {
      q,
      city,
      postalCode,
      service,
      lat,
      lng,
      radius = 20000,
      verified,
      page = 1,
      perPage = 20,
    } = searchDto;

    const skip = (page - 1) * perPage;
    const take = perPage;

    // Build where clause
    const where: Prisma.ProfessionalWhereInput = {};

    // Text search
    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { bio: { contains: q, mode: 'insensitive' } },
        { city: { contains: q, mode: 'insensitive' } },
      ];
    }

    // City filter
    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    // Postal code filter
    if (postalCode) {
      where.postalCode = postalCode;
    }

    // Verified filter
    if (verified !== undefined) {
      where.verified = verified;
    }

    // Service filter (search in related services)
    if (service) {
      where.services = {
        some: {
          OR: [
            { title: { contains: service, mode: 'insensitive' } },
            { description: { contains: service, mode: 'insensitive' } },
          ],
        },
      };
    }

    // Get total count
    const total = await this.prisma.professional.count({ where });

    // Get practitioners
    let practitioners = await this.prisma.professional.findMany({
      where,
      skip,
      take,
      include: {
        services: {
          take: 5,
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            durationMinutes: true,
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      orderBy: [
        { verified: 'desc' },
        { rating: 'desc' },
        { reviewCount: 'desc' },
      ],
    });

    // If location-based search, calculate distances
    if (lat && lng) {
      practitioners = practitioners
        .map((p) => {
          if (p.latitude && p.longitude) {
            const distance = this.calculateDistance(
              lat,
              lng,
              p.latitude,
              p.longitude,
            );
            return { ...p, distance };
          }
          return { ...p, distance: null };
        })
        .filter((p) => p.distance === null || p.distance <= radius)
        .sort((a, b) => {
          if (a.distance === null) return 1;
          if (b.distance === null) return -1;
          return a.distance - b.distance;
        });
    }

    // Map practitioners data (IDs are already strings with UUID)
    const data = practitioners.map((p) => ({
      ...p,
      specialties: [], // Add empty specialties array for frontend compatibility
    }));

    return {
      meta: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
      data,
    };
  }

  async findOne(slug: string) {
    const practitioner = await this.prisma.professional.findUnique({
      where: { slug },
      include: {
        services: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            durationMinutes: true,
          },
        },
        reviews: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    });

    if (!practitioner) {
      throw new NotFoundException('Practitioner not found');
    }

    return {
      ...practitioner,
      specialties: [], // Add empty specialties array for frontend compatibility
    };
  }

  async create(createDto: CreatePractitionerDto) {
    const practitioner = await this.prisma.professional.create({
      data: createDto,
    });

    return practitioner;
  }

  async update(id: string, updateDto: UpdatePractitionerDto) {
    const practitioner = await this.prisma.professional.update({
      where: { id },
      data: updateDto,
    });

    return practitioner;
  }

  async remove(id: string) {
    await this.prisma.professional.delete({
      where: { id },
    });

    return { message: 'Practitioner deleted successfully' };
  }

  // Helper: Calculate distance between two coordinates (Haversine formula)
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }
}
