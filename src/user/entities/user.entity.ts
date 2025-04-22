import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';
import { BaseModel } from '../../../BaseEntities/BaseModel'
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseModel{
    @Column()
    Username: string

    @Column()
    Email: string

    @Column()
    @Exclude({ toPlainOnly: true })
    PasswordHash: string
}
