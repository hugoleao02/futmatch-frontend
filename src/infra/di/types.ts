import type { IAuthRepository } from '../../core/repositories/IAuthRepository';
import type { IHomeUseCase } from '../../core/usecases/interfaces/IHomeUseCase';
import type { ILoginUseCase } from '../../core/usecases/interfaces/ILoginUseCase';
import type { IRegisterUseCase } from '../../core/usecases/interfaces/IRegisterUseCase';

export interface Container {
  repositories: {
    authRepository: IAuthRepository;
  };
  useCases: {
    loginUseCase: ILoginUseCase;
    registerUseCase: IRegisterUseCase;
    homeUseCase: IHomeUseCase;
  };
}
