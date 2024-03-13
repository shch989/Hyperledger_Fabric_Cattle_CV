export class CreateCattleRequestDto {
  cattleId: string
  userId: string
  residence: string
  birth: string
  parentId: ParentCattleData
}

class ParentCattleData {
  fatherId: string
  motherId: string
}