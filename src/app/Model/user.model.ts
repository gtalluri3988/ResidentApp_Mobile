export class UserModel {
    id!: number;
    email?: string;
    password?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    status?: string;
    roleId?: number | null;
    roleName?: string;
    lastLogin?: Date | null;
    userName?: string;
    picturePath?: string;
    passwordExpiryDate?: Date | null;
    badLoginAttempt?: number | null;
    communityId?: number | null;
}