import { Controller, Get, Param, Query } from '@nestjs/common';
import { PractitionersService } from './practitioners.service';

@Controller('practitioners')
export class PractitionersController {
  constructor(private readonly svc: PractitionersService) {}

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Get('/search')
  search(@Query('q') q: string) {
    return this.svc.search(q || '');
  }
}
