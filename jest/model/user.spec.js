const { UserModel } = require("./user-keys")
const { Database } = require('../config/db-connection');

describe('User keys Model', () => {

    afterEach(async () => {
        await Database.dropCollection('user_keys')
    })

    it('should create a key when tenant and webhook is provider', async () => {
        const data = { tenant: 'BART', webhook: 'url-webhook' }

        const result = await UserKeysModel.create(data)

        expect(result).not.toBeNull()
        expect(result).toHaveProperty('_id')
        expect(result).toHaveProperty('createdAt')
        expect(result.tenant).toBe(data.tenant)
        expect(result.webhook).toBe(data.webhook)
    })

    it('should create a key when tenant and webhook is provider', async () => {
        const data = { tenant: 'BART', webhook: 'url-webhook' }
        const otherData = { tenant: 'Test', webhook: 'url-webhook' }
        const keyBart = await UserKeysModel.create(data)
        await UserKeysModel.create(otherData)

        const result = await UserKeysModel.findByKey(keyBart.key)

        expect(result).not.toBeNull()
        expect(result).toHaveProperty('_id')
        expect(result).toHaveProperty('createdAt')
        expect(result.tenant).toBe(data.tenant)
        expect(result.webhook).toBe(data.webhook)
    })
})