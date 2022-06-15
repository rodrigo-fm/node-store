import { AddAccountArgs } from "../../../../src/project/2-domain/usecases";
import { IAccountRepository, IFindByEmailRepository } from "../../../../src/project/3-data/dependencies/IAccountRepository";
import { makeSut } from "./AddAccountUseCaseMocks";

describe('AddAccountUseCase', () => {

    const validArgs: AddAccountArgs = {
        email: 'email@email.com',
        name: 'username',
        password: 'password',
    };

    const mockRepositoryFindByEmail = (repository: IAccountRepository, mockedReturn: IFindByEmailRepository.Return | null): void => {
        jest.spyOn(repository, 'findByEmail').mockReturnValueOnce(Promise.resolve(mockedReturn));
    }

    test('Should return false if email already exists on the database' , async () => {
        // arrange
        const { repository, sut } = makeSut();
        mockRepositoryFindByEmail(repository,{
            email: 'email@email.com',
            name: 'username',
        });

        // act
        const result: boolean = await sut.handle({...validArgs});

        // assert
        expect(result).toBe(false);
    });

    test('Should return false if account creation fails' , async () => {
        // arrange
        const { repository, sut } = makeSut();
        jest.spyOn(repository, 'create').mockReturnValueOnce(Promise.resolve(false));

        // act
        const result: boolean = await sut.handle({...validArgs});

        // assert
        expect(result).toBe(false);
    });

    test('Should return true if account creation succeeds' , async () => {
        // arrange
        const { repository, sut } = makeSut();        
        mockRepositoryFindByEmail(repository,null);

        // act
        const result: boolean = await sut.handle({...validArgs});

        // assert
        expect(result).toBe(true);
    });
});