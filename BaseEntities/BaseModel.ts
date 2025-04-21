import { Entity, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, ObjectId, Column } from 'typeorm';


export abstract class BaseModel
{
    @ObjectIdColumn()
    _id: ObjectId;
    
    @Column()
    CreatedAt: Date

    @Column()
    UpdatedAt: Date
}