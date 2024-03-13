import { Body, Controller, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { CattleService } from './cattle.service';
import { CreateCattleRequestDto } from './dtos/CreateCattleRequest.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('cattle')
@UseInterceptors(new SuccessInterceptor())
export class CattleController {
  constructor(private readonly cattleService: CattleService) {}

  @Post()
  async createCattle(@Body() cattleData: CreateCattleRequestDto) {
    const cattleResult = await this.cattleService.createCattle(cattleData)
    return cattleResult
  }

  @Get(':userId/all-cattles')
  async getAllCattles(@Param('userId') userId: string) {
    const cattleResult = await this.cattleService.getAllCattles(userId)
    return cattleResult
  }
  
  @Get(':userId')
  async getUserCattles(@Param('userId') userId: string) {
    const cattleResult = await this.cattleService.getUserCattles(userId)
    return cattleResult
  }
  
  @Get(':userId/:cattleId')
  async ReadCattle(@Param('userId') userId: string, @Param('cattleId') cattleId: string) {
    const cattleResult = await this.cattleService.ReadCattle(userId, cattleId)
    return cattleResult
  }
}
