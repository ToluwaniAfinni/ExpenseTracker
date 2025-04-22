import { Entity, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, ObjectId, Column } from 'typeorm';


export abstract class BaseModel
{
    @ObjectIdColumn()
    _id: ObjectId;
    
    @CreateDateColumn()
    CreatedAt: Date

    @UpdateDateColumn()
    UpdatedAt: Date
}