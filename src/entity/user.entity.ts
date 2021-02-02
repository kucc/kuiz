import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'int',
    default: 0,
  })
  point: number;

  @Column({
    type: 'int',
    default: 0,
  })
  level: number;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  isMember: boolean;
}
