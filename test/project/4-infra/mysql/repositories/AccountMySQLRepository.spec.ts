import { IAddAccountRepository } from '../../../../../src/project/3-data/dependencies/IAccountRepository';
import { UserProfileEnum } from '../../../../../src/shared/enums/UserProfileEnum';
import { makeSut } from './AccoutMySQLRepositoryMocks';

describe('create', () => {

    const validArgs: IAddAccountRepository.Args = {
        name: 'username',
        email: 'email@email.com',
        password: 'password',
        userProfileId: UserProfileEnum.CONSUMER,
    };

    test('Should return true if an account is created succesfully' , async () => {
        // arrange
        const { datasource, sut } = makeSut();
        jest.spyOn(datasource, 'query').mockReturnValueOnce(Promise.resolve([]));

        // act
        const result: boolean = await sut.create({...validArgs});

        // assert
        expect(result).toBe(true);
    });

    // test('Should throw a database exception if account creation fails' , async () => {
    //     // TODO: Study typeORM datasource to create this test
    // });
});

describe('findByEmail', () => {

    const email: string = 'email@email.com';

    test('Should return null if no user is found' , async () => {
        // arrange
        const { datasource, sut } = makeSut();
        jest.spyOn(datasource, 'query').mockReturnValueOnce(Promise.resolve([]));

        // act
        const result = await sut.findByEmail(email);

        // assert
        expect(result).toBe(null);
    });

    test('Should return some user data if a user is found by email' , async () => {
        // arrange
        const { datasource, sut } = makeSut();
        jest.spyOn(datasource, 'query').mockReturnValueOnce(Promise.resolve([{
            email: email,
            name: 'username',
        }]));

        // act
        const result = await sut.findByEmail(email);

        // assert
        expect(result.email).toBe(email);
    });

});