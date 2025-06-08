import type { IAuthRepository } from '../../core/repositories/IAuthRepository';
import type { IPartidaRepository } from '../../core/repositories/IPartidaRepository';
import type { IHomeUseCase } from '../../core/usecases/interfaces/IHomeUseCase';
import type { ILoginUseCase } from '../../core/usecases/interfaces/ILoginUseCase';
import type { IRegisterUseCase } from '../../core/usecases/interfaces/IRegisterUseCase';

export interface Container {
  repositories: {
    authRepository: IAuthRepository;
    partidaRepository: IPartidaRepository;
  };
  useCases: {
    loginUseCase: ILoginUseCase;
    registerUseCase: IRegisterUseCase;
    homeUseCase: IHomeUseCase;
  };
}
