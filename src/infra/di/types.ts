import type { IAuthRepository } from '../../domain/repositories/IAuthRepository.ts';
import type { IParticipacaoRepository } from '../../domain/repositories/IParticipacaoRepository.ts';
import type { IPartidaRepository } from '../../domain/repositories/IPartidaRepository.ts';
import type { IHomeUseCase } from '../../domain/usecases/interfaces/IHomeUseCase.ts';
import type { ILoginUseCase } from '../../domain/usecases/interfaces/ILoginUseCase.ts';
import type { IParticipacaoUseCase } from '../../domain/usecases/interfaces/IParticipacaoUseCase.ts';
import type { IRegisterUseCase } from '../../domain/usecases/interfaces/IRegisterUseCase.ts';

export interface Container {
  repositories: {
    authRepository: IAuthRepository;
    partidaRepository: IPartidaRepository;
    participacaoRepository: IParticipacaoRepository;
  };
  useCases: {
    loginUseCase: ILoginUseCase;
    registerUseCase: IRegisterUseCase;
    homeUseCase: IHomeUseCase;
    participacaoUseCase: IParticipacaoUseCase;
  };
}
