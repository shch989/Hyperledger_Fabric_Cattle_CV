import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// 외부 서비스
import { AppUtilsService } from 'src/lib/apputil.service';
import { CAUtilsService } from 'src/lib/cautil.service';
// DTO
import { AdminRequestDto } from './dtos/AdminResponse.dto';

@Injectable()
export class AdminService {
  constructor(private readonly appUtilsService: AppUtilsService, private readonly caUtilsService: CAUtilsService) { }

  async createAdmin(adminData: AdminRequestDto): Promise<any> {
    const aid = adminData.adminId
    const apw = adminData.adminPw
    console.log(aid)
    console.log(apw)
    try {
      const caClient = this.caUtilsService.buildCAClient();
      const wallet = await this.appUtilsService.buildWallet();
      await this.caUtilsService.enrollAdmin(caClient, wallet, aid, apw);

      const rObj = { message: "An admin id is created" }
      return rObj

    } catch (error) {
      console.log(error);
      throw new HttpException({
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

