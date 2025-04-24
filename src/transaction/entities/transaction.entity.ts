import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';
import { BaseModel } from '../../../BaseEntities/BaseModel'

export class Transaction extends BaseModel{

    @Column()
    Amount: number

    // @Column()
    // Type: string //income or expense

    @Column({ nullable: true })
    Description: string

    @Column()
    DateOftransaction: Date

    // @Column()
    // UserId: ObjectId

    // @Column()
    // CategoryId: ObjectId

}
