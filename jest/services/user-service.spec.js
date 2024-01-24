const { UserModel } = require("../model/user-keys");
const { UserService } = require("./user-key-service");

jest.mock("../model/user-keys");

describe('User Key Service', () => {

    const tenant = "BART"

    const resultCreatedExpected = {
        _id: "uuid-generate",
        createdAt: Date.now(),
        tenant,
        key: "uuid-generate",
        wbhook: "webhook"
    };
    it('should create a key when data is provider', async () => {
        jest
            .spyOn(UserModel, "create")
            .mockImplementationOnce(() => resultCreatedExpected);

        const data = { tenant, webhook: "webhook" }

        await UserService.create(data)

        expect(UserModel.create).toHaveBeenCalledWith(data)
        expect(UserModel.create).toHaveBeenCalledTimes(1)
    })
    
    it('should return a user key when key is provider', async () => {
        jest
            .spyOn(UserModel, "findByKey")
            .mockImplementationOnce(() => resultCreatedExpected);


        await UserService.findByKey("key-uuid")

        expect(UserModel.findByKey).toHaveBeenCalledWith("key-uuid")
        expect(UserModel.findByKey).toHaveBeenCalledTimes(1)
    })
})