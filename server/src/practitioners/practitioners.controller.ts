import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PractitionersService } from './practitioners.service';
import { SearchPractitionersDto } from './dto/search-practitioners.dto';
import { CreatePractitionerDto } from './dto/create-practitioner.dto';
import { UpdatePractitionerDto } from './dto/update-practitioner.dto';
import { Public } from '../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('practitioners')
@UseGuards(JwtAuthGuard)
export class PractitionersController {
  constructor(private readonly practitionersService: PractitionersService) {}

  @Public()
  @Get()
  async search(@Query() searchDto: SearchPractitionersDto) {
    return this.practitionersService.search(searchDto);
  }

  @Public()
  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.practitionersService.findOne(slug);
  }

  @Post()
  async create(@Body() createDto: CreatePractitionerDto) {
    return this.practitionersService.create(createDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdatePractitionerDto,
  ) {
    return this.practitionersService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.practitionersService.remove(id);
  }
}
