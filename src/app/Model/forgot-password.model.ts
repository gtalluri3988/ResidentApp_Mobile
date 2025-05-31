export class ForgotPassword {
    constructor(
        public currentPassword: string = '',
        public Password: string = '',
        public confirmPassword: string = '',
        public residentId: number = 0,

    ) { }
}