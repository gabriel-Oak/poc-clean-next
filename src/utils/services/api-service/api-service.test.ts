import { AxiosInstance } from "axios";
import { mock, mockReset } from "jest-mock-extended";
import ApiService from "./api-service";

describe('ApiService Tests', () => {
  const axiosMock = mock<AxiosInstance>();

  beforeEach(() => {
    mockReset(axiosMock);
  });

  it('Should get', async () => {
    axiosMock.get.mockImplementation(async () => ({ data: 'Hello Guys' }));
    const service = new ApiService(axiosMock);

    const result = await service.get('/test');
    expect(result).toBe('Hello Guys');
  });

  it('Should post', async () => {
    axiosMock.post.mockImplementation(async () => ({ data: 'Hello Guys' }));
    const service = new ApiService(axiosMock);

    const result = await service.post('/test', {});
    expect(result).toBe('Hello Guys');
  });
});