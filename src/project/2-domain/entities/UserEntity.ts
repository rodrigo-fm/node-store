interface TokenEntity {
    value: string;
    expiryDate: Date;
}

export default interface UserEntity {
    id: number;
    name: string;
    email: string;
    userProfileId: number;
    token: TokenEntity;
}