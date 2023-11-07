const request = require('supertest')
const app = require('../')


describe('GET Endpoints', () => {
    it('Should fetch all users data', async () => {
        const res = await request(app)
            .get('/API/v1/user')

        expect(res.statusCode).toBe(200)
        expect(res.body.data).toBeTruthy()
    })

    it('Should fetch a user by ID', async () => {
        const user_id = 9
        const res = await request(app)
            .get(`/API/v1/user/${user_id}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.data).toBeTruthy()
    })

    it('Should fetch all accounts data', async () => {
        const res = await request(app)
            .get('/API/v1/account')

        expect(res.statusCode).toBe(200)
        expect(res.body.data).toBeTruthy()
    })

    it('Should fetch an account by ID', async () => {
        const account_id = 9
        const res = await request(app)
            .get(`/API/v1/account/${account_id}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.data).toBeTruthy()
    })

    it('Should fetch all transactions data', async () => {
        const res = await request(app)
            .get('/API/v1/transaction')

        expect(res.statusCode).toBe(200)
        expect(res.body.data).toBeTruthy()
    })

    it('Should fetch an transaction by ID', async () => {
        const id = 9
        const res = await request(app)
            .get(`/API/v1/transaction/${id}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.data).toBeTruthy()
    })
})
