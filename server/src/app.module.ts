import { Module } from '@nestjs/common';
import { LibModule } from './lib/lib.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [LibModule, AdminModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
