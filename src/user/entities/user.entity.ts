import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';
import { BaseModel } from '../../../BaseEntities/BaseModel'

@Entity()
export class User extends BaseModel{
    @Column()
    Username: string

    @Column()
    Email: string

    @Column()
    PasswordHash: string
}
