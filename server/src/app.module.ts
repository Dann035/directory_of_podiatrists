import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PractitionersModule } from './practitioners/practitioners.module';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [PractitionersModule, AuthModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
