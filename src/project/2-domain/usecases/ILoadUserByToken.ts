import { UserEntity } from "../entities";

export default interface ILoadUserByTokenUseCase {
    handle(token: string): Promise<UserEntity>;
}