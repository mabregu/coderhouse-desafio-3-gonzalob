
const request = require('supertest');
const server = require('../index');

describe('Test entrega3', () => {


    afterAll( () => {
        server.close();
    })
    
    test('/healthcheck', async () => {
        const res = await request(server).get('/healthcheck');
        const healthcheck = {
            ok: true,
            msg: "healthcheck ok!"
        }
        //expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(healthcheck);
    });

});
