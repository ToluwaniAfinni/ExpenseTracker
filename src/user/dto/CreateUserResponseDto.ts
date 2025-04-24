import { BaseModel } from '../../../BaseEntities/BaseModel';
import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

export class CreateUserResponseDto extends BaseModel{
        @Column()
        Username: string
    
        @Column()
        Email: string;

        constructor( 
            Username: string, Email: string,
            CreatedAt: Date, UpdatedAt: Date
        )
        {
            super();

            this.Username = Username;
            this.Email = Email;
            this.CreatedAt = CreatedAt;
            this.UpdatedAt = UpdatedAt
        }
    
}