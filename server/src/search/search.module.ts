import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { PractitionersModule } from '../practitioners/practitioners.module';

@Module({
  imports: [PractitionersModule],
  controllers: [SearchController],
})
export class SearchModule {}
