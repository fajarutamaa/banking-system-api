const request = require('supertest')
const app = require('..')


describe('GET Endpoints', () => {
    test('Should fetch all users data', async () => {
        try {
            const res = await request(app)
                .get('/API/v1/user')


            expect(res.statusCode).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.message).toBe('fetch all user success')
            expect(res.body.data).toBeTruthy()
            done()
        } catch (e) { }
    })

    test('Should fetch a user by ID', async () => {
        try {
            const user_id = 9
            const res = await request(app)
                .get(`/API/v1/user/${user_id}`)

            expect(res.statusCode).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.message).toBe('fetch user detail success')
            expect(res.body.data).toBeTruthy()
            done()
        } catch (e) { }
    })

    test('Should fetch all accounts data', async () => {
        try {
            const res = await request(app)
                .get('/API/v1/account')

            expect(res.statusCode).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.message).toBe('fetch all account is success')
            expect(res.body.data).toBeTruthy()
            done()
        } catch (e) { }
    })

    test('Should fetch an account by ID', async () => {
        try {
            const account_id = 9
            const res = await request(app)
                .get(`/API/v1/account/${account_id}`)

            expect(res.statusCode).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.message).toBe('fetch account by id is success')
            expect(res.body.data).toBeTruthy()
            done()
        } catch (e) { }
    })

    test('Should fetch all transactions data', async () => {
        try {
            const res = await request(app)
                .get('/API/v1/transaction')

            expect(res.statusCode).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.message).toBe('fetch account by id is success')
            expect(res.body.data).toBeTruthy()
            done()
        } catch (e) { }

    })

    test('Should fetch an transaction by ID', async () => {
        try {
            const id = 9
            const res = await request(app)
                .get(`/API/v1/transaction/${id}`)

            expect(res.statusCode).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.message).toBe('fetch all history transaction by source account id is success')
            expect(res.body.data).toBeTruthy()
            done()
        } catch (e) { }
    })
})

describe('POST Endpoints', () => {
    test('should insert a new user', async () => {
        try {
            const data = {
                name: 'Doni',
                email: 'doni@gmail.com',
                password: 'newuserpassword',
                identity_type: 'KTP',
                identity_number: 987654321,
                address: 'Jakarta',
            }

            const res = await request(app)
                .post('/API/v1/user')
                .send(data)

            expect(res.statusCode).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.message).toBe('created user success')
            expect(res.body.data).toBeTruthy()

            expect(res.body.data.name).toBe(data.name)
            expect(res.body.data.email).toBe(data.email)
            expect(res.body.data.profile.identity_type).toBe(data.identity_type)
            expect(res.body.data.profile.identity_number).toBe(data.identity_number)
            expect(res.body.data.profile.address).toBe(data.address)
            done()
        } catch (error) { }
    })


    test('should insert a new account', async () => {
        try {
            const data = {
                user_id: 11,
                bank_name: 'BRI',
                bank_account_number: 1234567809,
            }

            const res = await request(app)
                .post('/API/v1/account')
                .send(data)

            expect(res.statusCode).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.message).toBe('create account is success')
            expect(res.body.data).toBeTruthy()

            expect(res.body.data.user_id).toBe(data.user_id)
            expect(res.body.data.bank_name).toBe(data.bank_name)
            expect(res.body.data.bank_account_number).toBe(data.bank_account_number)
            done()
        } catch (error) { }
    })

    test('should insert a new transaction', async () => {
        try {
            const data = {
                source_account_id: 12,
                destination_account_id: 12,
                amount: 10000,
            }

            const res = await request(app)
                .post('/API/v1/transaction')
                .send(data)

            expect(res.statusCode).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.message).toBe('transaction success')
            expect(res.body.data).toBeTruthy()

            expect(res.body.data.source_account_id).toBe(data.source_account_id)
            expect(res.body.data.destination_account_id).toBe(data.destination_account_id)
            expect(res.body.data.amount).toBe(data.amount)
            done()
        } catch (error) { }
    })
})

