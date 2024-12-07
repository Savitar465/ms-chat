import { Test, TestingModule } from '@nestjs/testing';
import { SaveMensajeGateway } from './save-mensaje.gateway';

describe('SaveMensajeGateway', () => {
  let gateway: SaveMensajeGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaveMensajeGateway],
    }).compile();

    gateway = module.get<SaveMensajeGateway>(SaveMensajeGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
