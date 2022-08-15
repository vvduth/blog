import { Entity, Column, Index, BeforeInsert } from "typeorm";
import Model from "./model.entity";
import bcrypt from "bcryptjs";

export enum RoleEnumType {
  USER = "user",
  ADMIN = "admin",
}

@Entity("users")
export class User extends Model {
  @Column()
  name!: string;

  @Index("email_index")
  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: "enum",
    enum: RoleEnumType,
    default: RoleEnumType.USER,
  })
  role?: RoleEnumType.USER;

  @Column({
    default: false,
  })
  verified?: boolean;

  toJSON() {
    return { ...this, password: undefined, verified: undefined };
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  // validate password
  static async comparePassword (
    candidatePassword: string , 
    hashedPassword: string , 
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword ) ;
  }
}
