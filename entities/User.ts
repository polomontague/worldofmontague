import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ length: 30 })
    first_name!: string

    @Column({ length: 30 })
    last_name!: string
}