import * as bcrypt from 'bcrypt';

export function hashPassword(password: string) {

    const salt=bcrypt.genSaltSync();

    console.log("SALT: " + salt)

    return bcrypt.hashSync(password, salt);
} 