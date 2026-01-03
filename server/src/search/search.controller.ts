import { Controller, Get, Query } from '@nestjs/common';
import { PractitionersService } from '../practitioners/practitioners.service';

@Controller('search')
export class SearchController {
  constructor(private readonly svc: PractitionersService) {}

  @Get()
  search(@Query('q') q: string) {
    return this.svc.search(q || '');
  }
}
