package main

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type SmartContract struct {
	contractapi.Contract
}

type CattleData struct {
	CattleID  string            `json:"cattleId"`
	UserID 	  string            `json:"userId"`
	Residence string            `json:"residence"`
	Birth     string            `json:"birth"`
	ParentID  *ParentCattleData `json:"parentId"`
}

type ParentCattleData struct {
	FatherID string `json:"fatherId"`
	MotherID string `json:"motherId"`
}

// CreateCattle
func (s *SmartContract) CreateCattle(ctx contractapi.TransactionContextInterface, cattleId string, userId string, residence string, birth string, fatherId string, motherId string) error {
	// 기등록된 cattle id가 있는지 검증
	exists, err := s.CattleExists(ctx, cattleId)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the cattle %s already exists", cattleId)
	}

	cattle := CattleData{
		CattleID: cattleId,
		UserID: userId,
		Residence: residence,
		Birth:     birth,
		ParentID: &ParentCattleData{
			FatherID: fatherId,
			MotherID: motherId,
		},
	}

	cattleJSON, err := json.Marshal(cattle)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(cattleId, cattleJSON)
}

// CattleExists
func (s *SmartContract) CattleExists(ctx contractapi.TransactionContextInterface, cattleId string) (bool, error) {
	cattleJSON, err := ctx.GetStub().GetState(cattleId)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}

	// return assetJSON != nil, nil
	if cattleJSON == nil {
		return false, nil
	} else {
		return true, nil
	}
}

// ReadCattle
func (s *SmartContract) ReadCattle(ctx contractapi.TransactionContextInterface, cattleId string) (*CattleData, error) {
	cattleJSON, err := ctx.GetStub().GetState(cattleId)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if cattleJSON == nil {
		return nil, fmt.Errorf("the event %s does not exist", cattleId)
	}

	var cattle CattleData
	err = json.Unmarshal(cattleJSON, &cattle)
	if err != nil {
		return nil, err
	}

	return &cattle, nil
}

// ReadAllCattleByUserID
func (s *SmartContract) ReadAllCattleByUserId(ctx contractapi.TransactionContextInterface, userId string) ([]*CattleData, error) {
    // 변수 초기화
    var allCattleData []*CattleData

    // 월드 스테이트에서 모든 키-값 쌍 가져오기
    resultsIterator, err := ctx.GetStub().GetStateByRange("", "")
    if err != nil {
        return nil, fmt.Errorf("failed to get all cattle data: %v", err)
    }
    defer resultsIterator.Close()

    // 결과 반복
    for resultsIterator.HasNext() {
        // 결과 가져오기
        queryResponse, err := resultsIterator.Next()
        if err != nil {
            return nil, fmt.Errorf("error while iterating over query results: %v", err)
        }

        // CattleData 구조체로 언마샬링
        var cattle CattleData
        err = json.Unmarshal(queryResponse.Value, &cattle)
        if err != nil {
            return nil, fmt.Errorf("failed to unmarshal cattle data: %v", err)
        }

        // 사용자 ID가 일치하는 경우에만 배열에 추가
        if cattle.UserID == userId {
            allCattleData = append(allCattleData, &cattle)
        }
    }

    return allCattleData, nil
}

func (s *SmartContract) GetAllCattles(ctx contractapi.TransactionContextInterface) ([]*CattleData, error) {
	var allCattleData []*CattleData

	resultsIterator, err := ctx.GetStub().GetStateByRange("", "")
	if err != nil {
		return nil, fmt.Errorf("failed to get all cattles: %v", err)
	}
	defer resultsIterator.Close()

	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, fmt.Errorf("error while iterating over query results: %v", err)
		}

		var cattle CattleData
		err = json.Unmarshal(queryResponse.Value, &cattle)
		if err != nil {
			return nil, fmt.Errorf("failed to unmarshal cattle data: %v", err)
		}

		allCattleData = append(allCattleData, &cattle)
	}

	return allCattleData, nil
}

// main
func main() {
	expChaincode, err := contractapi.NewChaincode(&SmartContract{})
	if err != nil {
		log.Panicf("Error creating exp event chaincode: %v", err)
	}

	if err := expChaincode.Start(); err != nil {
		log.Panicf("Error starting exp event chaincode: %v", err)
	}
}
