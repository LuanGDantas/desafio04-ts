import { UserController } from "./UserController";
import { UserService } from '../services/UserService';
import { Request } from 'express';
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteUser: jest.fn()
    }
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(201);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' });
    })

    it("Deve retonar erro caso o usuário não informe o name", () => {
        const mockRequest = {
            body: {
                email: "nath@test.com",
            },
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({
          message: "Bad request! Name obrigatório",
        });
    });

    it("Deve chamar service getAllUsers e retorna status 200", () => {
        const mockResponse = makeMockResponse();
        const mockGetAllUsers = jest.spyOn(userController.userService, 'getAllUsers');
        userController.getAllUsers({} as Request, mockResponse);
        expect(mockResponse.state.status).toBe(200);
        expect(mockGetAllUsers).toHaveBeenCalled();
    });

    it("Deve retonar erro caso o usuário não informe o email", () => {
      const mockRequest = {
        body: {
          name: 'Jorge Jesus'
        },
      } as Request;
      const mockResponse = makeMockResponse();
      userController.createUser(mockRequest, mockResponse);
      expect(mockResponse.state.status).toBe(400);
      expect(mockResponse.state.json).toMatchObject({
        message: 'Bad request! Email obrigatório',
      });
    });

    it("Deve chamar service deleteUser e retorna status 204", () => {
      const userName = 'João de Deus'; 
      const mockRequest = makeMockRequest({
        params: { userName },
      });
      const mockResponse = makeMockResponse();
      const mockDeleteUser = jest.spyOn(userController.userService, 'deleteUser');
      userController.deleteUser(mockRequest, mockResponse);
      expect(mockResponse.state.status).toBe(204);
      expect(mockDeleteUser).toBeCalled();
    });
})
