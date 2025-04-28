import * as bcrypt from 'bcrypt'

export class HashPassword {
  static hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}