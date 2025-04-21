import { BaseModel } from "BaseEntities/BaseModel";
import { ObjectId } from "mongodb";
import { Column, Entity } from "typeorm";

@Entity()
export class Category extends BaseModel {

    @Column()
    name: string;

    @Column()
    type: 'income' | 'expense';

    @Column()
    UserId: ObjectId
}
