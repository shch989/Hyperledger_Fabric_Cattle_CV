import { Module } from '@nestjs/common';
import { LibModule } from './lib/lib.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { CattleModule } from './cattle/cattle.module';

@Module({
  imports: [LibModule, AdminModule, UserModule, CattleModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
