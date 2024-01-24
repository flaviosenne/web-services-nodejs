const { UserService } = require("../services/user-service");
const { UserController } = require("./user-controller")

jest.mock('../services/user-service')

describe('User Key Controller', () => {
    let mockRequest = {};
    let mockResponse = {};
    let expectedResponse = {};
    beforeEach(() => {
        mockRequest = {
            body: {
                tenant: "BART",
                webhook: "webhhok",
            },
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        expectedResponse = {
            tenant: "BART",
            key: "uuid-generate",
        };
        UserService.create.mockImplementation(() => expectedResponse);
    });

    it('should create a key when data is provider', async () => {

        await UserController.create(mockRequest, mockResponse)

        expect(UserService.create).toHaveBeenCalledTimes(1);
        expect(UserService.create).toHaveBeenCalledWith(mockRequest.body);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
    })

    it('should return status 400 when missing tenant in request body', async () => {
        mockRequest.body.tenant = null

        await UserController.create(mockRequest, mockResponse)
        
        expect(mockResponse.status).toHaveBeenCalledWith(400)
        expect(mockResponse.send).toHaveBeenCalledWith({message: "Missing tenant in request body"})
        expect(UserService.create).toHaveBeenCalledTimes(0);
    })

    it('should return status 400 when missing webhook in request body', async () => {
        mockRequest.body.webhook = null
        
        await UserController.create(mockRequest, mockResponse)
        
        expect(mockResponse.status).toHaveBeenCalledWith(400)
        expect(mockResponse.send).toHaveBeenCalledWith({message: "Missing webhook in request body"})
        expect(UserService.create).toHaveBeenCalledTimes(0);
    })
    
    it('should return status 500 when throw someone error', async () => {
        jest
        .spyOn(UserService, "create")
        .mockImplementationOnce(() => {
            throw new Error("fake error")
        });
        
        UserController.create(mockRequest, mockResponse)
        
        expect(mockResponse.status).toHaveBeenCalledWith(500)
        expect(mockResponse.send).toHaveBeenCalledWith({message: "fake error"})
        expect(UserService.create).toHaveBeenCalledTimes(1);
    })
})