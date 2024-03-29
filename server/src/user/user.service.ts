import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// 외부 서비스
import { AppUtilsService } from 'src/lib/apputil.service';
import { CAUtilsService } from 'src/lib/cautil.service';
import { userRequestDto } from './dtos/UserRequest.dto';

@Injectable()
export class UserService {
  constructor(private readonly appUtilsService: AppUtilsService, private readonly caUtilsService: CAUtilsService) { }

  async createUser(userData: userRequestDto): Promise<any> {
    const uid = userData.userId
    const affilication = userData.affilication
    try {
      const caClient = this.caUtilsService.buildCAClient();
      const wallet = await this.appUtilsService.buildWallet();
      await this.caUtilsService.registerAndEnrollUser(caClient, wallet, 'Org1MSP', uid, affilication);

      const rObj = { message: `An user id is created - ${uid}` };
      return rObj;

    } catch (error) {
      console.error(error);
      throw new HttpException({
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async loginUser(userId: string) {
    const uid = userId
    console.log(uid)

    try {
      const wallet = await this.appUtilsService.buildWallet();
      const loginSuccess = await this.caUtilsService.isUserIdExists(wallet, uid)
      if (loginSuccess) {
        return uid
      } else {
        throw new Error(`Wallet for the user ID does not exist.`)
      }
    } catch (error) {
      console.error(error);
      throw new HttpException({
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}