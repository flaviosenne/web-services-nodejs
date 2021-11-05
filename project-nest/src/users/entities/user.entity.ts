import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class UserModel {
    @PrimaryGeneratedColumn()
    id: number

    @Column({name:'created_at'})
    createdAt: Date

    @Column()
    email: string
    
    @Column()
    name: string
    
    @Column()
    password: string
}
