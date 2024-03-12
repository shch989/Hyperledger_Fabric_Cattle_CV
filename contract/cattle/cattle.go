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
	Residence string            `json:"residence"`
	Birth     string            `json:"birth"`
	ParentID  *ParentCattleData `json:"parentId"`
}

type ParentCattleData struct {
	FatherID string `json:"fatherId"`
	MotherID string `json:"motherId"`
}

// CreateCattle
func (s *SmartContract) CreateCattle(ctx contractapi.TransactionContextInterface, cattleId string, residence string, birth string, fatherId string, motherId string) error {
	// 기등록된 cattle id가 있는지 검증
	exists, err := s.EXPExists(ctx, cattleId)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the cattle %s already exists", cattleId)
	}

	cattle := CattleData{
		CattleID:  cattleId,
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

// AssetExists
func (s *SmartContract) EXPExists(ctx contractapi.TransactionContextInterface, cattleId string) (bool, error) {
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

// ReadAsset
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
