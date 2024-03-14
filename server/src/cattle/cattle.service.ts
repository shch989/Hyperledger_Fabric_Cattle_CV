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

  // 특정 가축 조회
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

  // 모든 가축 조회
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

  async getFamilyTree(userId: string, cattleId: string) {
    const familyTree: any = {}; // 족보 정보를 저장할 객체

    // 주어진 가축의 정보 가져오기
    let currentCattleData = await this.ReadCattle(userId, cattleId);

    // 주어진 가축의 정보가 존재하는 경우
    while (currentCattleData) {
      // 현재 가축의 정보를 족보 객체에 추가
      familyTree[currentCattleData.message.cattleId] = currentCattleData;

      // 부모 가축의 정보 가져오기
      const parentId = currentCattleData.message.parentId;

      // 부모 가축의 정보가 존재하지 않는 경우 반복 중지
      if (!parentId.fatherId && !parentId.motherId) {
        break;
      }

      // 부모 가축의 정보 가져와서 족보 객체에 추가
      if (parentId.fatherId) {
        const fatherData = await this.ReadCattle(userId, parentId.fatherId);
        if (fatherData) {
          familyTree[fatherData.message.cattleId] = fatherData;
        }
      }

      if (parentId.motherId) {
        const motherData = await this.ReadCattle(userId, parentId.motherId);
        if (motherData) {
          familyTree[motherData.message.cattleId] = motherData;
        }
      }

      // 부모 가축의 정보 가져와서 현재 가축의 정보로 갱신
      const nextParentId = parentId.fatherId || parentId.motherId;
      currentCattleData = await this.ReadCattle(userId, nextParentId);
    }

    return familyTree;
  }
}
