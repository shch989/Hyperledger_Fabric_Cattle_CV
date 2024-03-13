import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Gateway, Wallet } from 'fabric-network';
import { AppUtilsService } from 'src/lib/apputil.service';
import { CAUtilsService } from 'src/lib/cautil.service';
import { CreateCattleRequestDto } from './dtos/CreateCattleRequest.dto';

@Injectable()
export class CattleService {
  constructor(private readonly appUtilsService: AppUtilsService, private readonly cautilsService: CAUtilsService) { }

  private readonly channelName = "samplechannal";
  private readonly chaincodeName = "cattle";

  // 가축 추가
  async createCattle(cattleData: CreateCattleRequestDto) {
    console.log(cattleData)

    const wallet: Wallet = await this.appUtilsService.buildWallet()
    const gateway = new Gateway()
    const ccp = this.appUtilsService.buildCCPOrg1()
    try {
      await gateway.connect(ccp, {
        wallet,
        identity: cattleData.userId,
        discovery: {
          enabled: true,
          asLocalhost: true
        }
      })
      const network = await gateway.getNetwork(this.channelName)
      const contract = network.getContract(this.chaincodeName)

      await contract.submitTransaction('CreateCattle', cattleData.cattleId, cattleData.userId, cattleData.residence, cattleData.birth, cattleData.parentId.fatherId, cattleData.parentId.motherId)
      const rObj = { message: `tx has been submitted` };
      return rObj;

    } catch (error) {
      console.error(error);
      throw new HttpException({
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      gateway.disconnect()
    }
  }

  // 특정 유저의 특정 가축 조회
  async ReadCattle(userId: string, cattleId: string) {
    console.log(userId, cattleId)

    const wallet: Wallet = await this.appUtilsService.buildWallet()
    const gateway = new Gateway()
    const ccp = this.appUtilsService.buildCCPOrg1()
    try {
      await gateway.connect(ccp, {
        wallet,
        identity: userId,
        discovery: {
          enabled: true,
          asLocalhost: true
        }
      })
      const network = await gateway.getNetwork(this.channelName)
      const contract = network.getContract(this.chaincodeName)

      const result = await contract.evaluateTransaction('ReadCattle', cattleId)
      const resultString = result.toString('utf-8');
      const parsed_data = JSON.parse(resultString)
      const rObj = { message: parsed_data };
      return rObj;

    } catch (error) {
      console.error(error);
      throw new HttpException({
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      gateway.disconnect()
    }
  }

  // 특정 유저의 모든 가축 조회
  async getUserCattles(userId: string) {
    console.log(userId)

    const wallet: Wallet = await this.appUtilsService.buildWallet()
    const gateway = new Gateway()
    const ccp = this.appUtilsService.buildCCPOrg1()
    try {
      await gateway.connect(ccp, {
        wallet,
        identity: userId,
        discovery: {
          enabled: true,
          asLocalhost: true
        }
      })
      const network = await gateway.getNetwork(this.channelName)
      const contract = network.getContract(this.chaincodeName)

      const result = await contract.evaluateTransaction('ReadAllCattleByUserId', userId)
      const resultString = result.toString('utf-8');
      const parsed_data = JSON.parse(resultString)
      const rObj = { message: parsed_data };
      return rObj;

    } catch (error) {
      console.error(error);
      throw new HttpException({
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      gateway.disconnect()
    }
  }

// 특정 유저의 모든 가축 조회
async getAllCattles(userId: string) {
  const wallet: Wallet = await this.appUtilsService.buildWallet();
  const gateway = new Gateway();
  const ccp = this.appUtilsService.buildCCPOrg1();
  try {
    await gateway.connect(ccp, {
      wallet,
      identity: userId,
      discovery: {
        enabled: true,
        asLocalhost: true
      }
    });
    const network = await gateway.getNetwork(this.channelName);
    const contract = network.getContract(this.chaincodeName);

    const result = await contract.evaluateTransaction('GetAllCattles');
    const resultString = result.toString('utf-8');
    const parsedData = JSON.parse(resultString);
    const rObj = { message: parsedData };
    return rObj;

  } catch (error) {
    console.error(error);
    throw new HttpException({
      error: error.message,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  } finally {
    gateway.disconnect();
  }
}
}
