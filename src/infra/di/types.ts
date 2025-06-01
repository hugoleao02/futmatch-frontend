import type { IAuthRepository } from '../../core/repositories/IAuthRepository';
import type { ILoginUseCase } from '../../core/usecases/interfaces/ILoginUseCase';
import type { IRegisterUseCase } from '../../core/usecases/interfaces/IRegisterUseCase';

export interface Container {
  repositories: {
    authRepository: IAuthRepository;
  };
  useCases: {
    loginUseCase: ILoginUseCase;
    registerUseCase: IRegisterUseCase;
  };
} 