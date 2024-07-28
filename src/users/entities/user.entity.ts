import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Userentity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with Id', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with Id', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('Remoed User with Id', this.id);
  }
}
