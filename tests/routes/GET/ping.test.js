const { server } = require('../../../server');

describe('the "ping" route at GET call', () => {
  const options = {
    method: 'GET',
    url: '/ping',
  };
  it('should respond with 200', async () => {
    const response = await server.inject(options);
    expect(response.statusCode).toEqual(200);
  });
  it('should respond with string "pong"', async () => {
    const response = await server.inject(options);
    expect(response.result).toEqual('pong');
  });
});
