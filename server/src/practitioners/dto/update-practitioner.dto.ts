import { CreatePractitionerDto } from './create-practitioner.dto';

export class UpdatePractitionerDto implements Partial<CreatePractitionerDto> {
  name?: string;
  bio?: string;
  city?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  licenseNumber?: string;
  verified?: boolean;
  latitude?: number;
  longitude?: number;
}

