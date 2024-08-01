import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("customer")
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  mobilePhone: string;

  @Column()
  balance: number;
}
