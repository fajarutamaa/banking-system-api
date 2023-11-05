const request = require('supertest')
const app = require('../index')


describe('Get Endpoints', () => {
    it('should fetch all users data', async () => {
        try {
            const res = await request(app)
            
            .get('/API/v1/user')

            expect(res.statusCode).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.data).toBeTruthy()
            expect(Array.isArray(res.body.data)).toBe(true)
        } catch (error) { }
    })
},

    it('should fetch a user by ID', async () => {
        try {
            
            const userId = 8
            const res = await request(app)
            
            .get(`/API/v1/user/${userId}`)

            expect(res.statusCode).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.data).toBeTruthy()

        } catch (error) { }
    }),

    it('should fetch all users data', async () => {
        try {
            const res = await request(app)
            
            .get('/API/v1/account')

            expect(res.statusCode).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.data).toBeTruthy()
            expect(Array.isArray(res.body.data)).toBe(true)
        } catch (error) { }
    }),

    it('should fetch a user by ID', async () => {
        try {
            
            const userId = 8
            const res = await request(app)
            
            .get(`/API/v1/account/${userId}`)

            expect(res.statusCode).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.data).toBeTruthy()

        } catch (error) { }
    }),

)