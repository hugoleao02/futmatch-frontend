import type { IAuthRepository } from '../../domain/repositories/IAuthRepository.ts';
import type { IPartidaRepository } from '../../domain/repositories/IPartidaRepository.ts';
import type { ILoginUseCase } from '../../domain/usecases/interfaces/ILoginUseCase.ts';
import type { IRegisterUseCase } from '../../domain/usecases/interfaces/IRegisterUseCase.ts';
import type { IHomeUseCase } from '../../domain/usecases/interfaces/IHomeUseCase.ts';


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
