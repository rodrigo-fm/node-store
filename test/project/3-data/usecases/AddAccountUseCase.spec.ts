import { AddAccountArgs } from "../../../../src/project/2-domain/usecases";
import { IAccountRepository, IFindByEmailRepository } from "../../../../src/project/3-data/dependencies/IAccountRepository";
import { UserProfileEnum } from "../../../../src/shared/enums/UserProfileEnum";
import { makeSut } from "./AddAccountUseCaseMocks";

describe('AddAccountUseCase', () => {

    const validArgs: AddAccountArgs = {
        email: 'email@email.com',
        name: 'username',
        password: 'password',
        userProfileId: UserProfileEnum.CONSUMER,
    };

    const mockRepositoryFindByEmail = (repository: IAccountRepository, mockedReturn: IFindByEmailRepository.Return | null): void => {
        jest.spyOn(repository, 'findByEmail').mockReturnValueOnce(Promise.resolve(mockedReturn));
    }

    test('Should return an error message if email already exists on the database' , async () => {
        // arrange
        const { repository, sut } = makeSut();
        mockRepositoryFindByEmail(repository,{
            email: 'email@email.com',
            name: 'username',
        });

        // act
        const result: boolean | string = await sut.handle({...validArgs});

        // assert
        expect(result).toBe("An account with that email already exists");
    });

    test('Should return an error message if account creation fails' , async () => {
        // arrange
        const { repository, sut } = makeSut();
        jest.spyOn(repository, 'findByEmail').mockReturnValueOnce(Promise.resolve(null));
        jest.spyOn(repository, 'create').mockReturnValueOnce(Promise.resolve(false));

        // act
        const result: boolean | string = await sut.handle({...validArgs});

        // assert
        expect(result).toBe('Error creating a new account');
    });

    test('Should return true if account creation succeeds' , async () => {
        // arrange
        const { repository, sut } = makeSut();        
        mockRepositoryFindByEmail(repository,null);

        // act
        const result: boolean | string = await sut.handle({...validArgs});

        // assert
        expect(result).toBe(true);
    });
});