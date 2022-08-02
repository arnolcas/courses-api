import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    JoinTable,
    ManyToMany,
} from "typeorm";
import Course from "../courses/course.entity";

@Entity()
export default class user extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    googleUid: string

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @ManyToMany(() => Course)
    @JoinTable()
    courses: Course[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
