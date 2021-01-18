const { User } = require('../../src/app/models')

describe('Authentication', ()=> {
    it('should two numbers', async () => {
        const user = await  User.create({
            name: 'joao',
            email: 'joao@email.com',
            password_hash: 'jogtg54wg3554ao'
        })

        console.log(user)

        expect(user.email).toBe('joao@email.com')
    })
})
