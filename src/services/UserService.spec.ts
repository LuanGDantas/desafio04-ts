import { User, UserService } from "./UserService";

describe('UserService', () => {
    const mockDb: User[] = [{ name: 'Jorge Jesus', email: 'email@test.com' }];
    const userService = new UserService(mockDb);

    it('Deve adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('nath', 'nath@test.com');
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb)
    })

    it('Deve excluir usuário informado', () => {
      const userName = "Jorge Jesus";
      userService.deleteUser(userName);
      expect(mockDb).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: userName }),
        ])
      );
    })
})
