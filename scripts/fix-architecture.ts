import { promises as fs } from 'fs';
import path from 'path';

// Definição das camadas e seus diretórios
const LAYERS = {
  domain: {
    path: 'src/domain',
    subdirs: ['entities', 'repositories', 'usecases', 'value-objects', 'interfaces'],
  },
  application: {
    path: 'src/application',
    subdirs: ['usecases', 'dtos', 'mappers', 'hooks'],
  },
  infrastructure: {
    path: 'src/infrastructure',
    subdirs: ['repositories', 'http', 'cache', 'services'],
  },
  presentation: {
    path: 'src/presentation',
    subdirs: ['components', 'pages', 'hooks', 'stores', 'routes'],
  },
  shared: {
    path: 'src/shared',
    subdirs: ['types', 'constants', 'utils'],
  },
};

// Função para listar arquivos recursivamente
async function listFiles(dir: string): Promise<string[]> {
  let files: string[] = [];
  const items = await fs.readdir(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = files.concat(await listFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

// Função para determinar a camada correta do arquivo
function determineLayer(filePath: string): { layer: string; subdir: string } | null {
  const fileName = path.basename(filePath).toLowerCase();
  const relativePath = filePath.replace(path.resolve('src') + path.sep, '');

  // Regras para Domain
  if (fileName.includes('entity') || fileName.includes('model')) {
    return { layer: 'domain', subdir: 'entities' };
  }
  if (
    fileName.startsWith('i') &&
    (fileName.includes('repository') || fileName.includes('usecase'))
  ) {
    return { layer: 'domain', subdir: 'interfaces' };
  }
  if (fileName.includes('value-object')) {
    return { layer: 'domain', subdir: 'value-objects' };
  }

  // Regras para Application
  if (fileName.includes('usecase') && !fileName.startsWith('i')) {
    return { layer: 'application', subdir: 'usecases' };
  }
  if (fileName.includes('dto')) {
    return { layer: 'application', subdir: 'dtos' };
  }
  if (fileName.includes('mapper')) {
    return { layer: 'application', subdir: 'mappers' };
  }
  if (
    fileName.includes('hook') &&
    !fileName.includes('useForm') &&
    !fileName.includes('useModal')
  ) {
    return { layer: 'application', subdir: 'hooks' };
  }

  // Regras para Infrastructure
  if (fileName.includes('repository') && !fileName.startsWith('i')) {
    return { layer: 'infrastructure', subdir: 'repositories' };
  }
  if (fileName.includes('api') || fileName.includes('http')) {
    return { layer: 'infrastructure', subdir: 'http' };
  }
  if (fileName.includes('cache')) {
    return { layer: 'infrastructure', subdir: 'cache' };
  }
  if (fileName.includes('service')) {
    return { layer: 'infrastructure', subdir: 'services' };
  }

  // Regras para Presentation
  if (fileName.includes('component') || fileName.includes('page')) {
    return { layer: 'presentation', subdir: 'components' };
  }
  if (
    fileName.includes('useForm') ||
    fileName.includes('useModal') ||
    fileName.includes('useToast')
  ) {
    return { layer: 'presentation', subdir: 'hooks' };
  }
  if (fileName.includes('store')) {
    return { layer: 'presentation', subdir: 'stores' };
  }
  if (fileName.includes('route')) {
    return { layer: 'presentation', subdir: 'routes' };
  }

  // Regras para Shared
  if (fileName.includes('type') || fileName.includes('interface')) {
    return { layer: 'shared', subdir: 'types' };
  }
  if (fileName.includes('constant')) {
    return { layer: 'shared', subdir: 'constants' };
  }
  if (fileName.includes('util') || fileName.includes('helper')) {
    return { layer: 'shared', subdir: 'utils' };
  }

  return null;
}

// Função para mover arquivos
async function moveFiles(files: string[]): Promise<void> {
  for (const file of files) {
    const target = determineLayer(file);
    if (target) {
      const { layer, subdir } = target;
      const targetPath = path.join(LAYERS[layer].path, subdir, path.basename(file));

      try {
        // Criar diretório de destino se não existir
        await fs.mkdir(path.dirname(targetPath), { recursive: true });

        // Mover arquivo
        await fs.rename(file, targetPath);
        console.log(
          `Movido: ${file.replace(path.resolve('src') + path.sep, '')} -> ${targetPath.replace(path.resolve('src') + path.sep, '')}`,
        );
      } catch (error) {
        console.error(`Erro ao mover ${file}:`, error);
      }
    }
  }
}

// Função para remover diretórios vazios
async function removeEmptyDirs(dir: string): Promise<void> {
  const items = await fs.readdir(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      await removeEmptyDirs(fullPath);
      const remainingItems = await fs.readdir(fullPath);
      if (remainingItems.length === 0) {
        await fs.rmdir(fullPath);
        console.log(
          `Removido diretório vazio: ${fullPath.replace(path.resolve('src') + path.sep, '')}`,
        );
      }
    }
  }
}

// Função para criar interfaces no domain
async function createDomainInterfaces(): Promise<void> {
  const interfaces = [
    {
      name: 'IAuthRepository',
      content: `import type { AuthenticatedUser } from '../entities/User';

export interface IAuthRepository {
  login(email: string, password: string): Promise<AuthenticatedUser>;
  register(nome: string, email: string, password: string): Promise<AuthenticatedUser>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<AuthenticatedUser | null>;
}`,
    },
    {
      name: 'IUserRepository',
      content: `import type { User } from '../entities/User';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: Omit<User, 'id'>): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}`,
    },
    {
      name: 'IPartidaRepository',
      content: `import type { Partida } from '../entities/Partida';

export interface IPartidaRepository {
  findById(id: string): Promise<Partida | null>;
  findAll(): Promise<Partida[]>;
  create(partida: Omit<Partida, 'id'>): Promise<Partida>;
  update(id: string, partida: Partial<Partida>): Promise<Partida>;
  delete(id: string): Promise<void>;
}`,
    },
  ];

  for (const interface_ of interfaces) {
    const filePath = path.join(LAYERS.domain.path, 'interfaces', `${interface_.name}.ts`);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, interface_.content);
    console.log(`Criada interface: ${interface_.name}`);
  }
}

// Função para criar DTOs na application
async function createApplicationDTOs(): Promise<void> {
  const dtos = [
    {
      name: 'user.dto',
      content: `export interface UserDTO {
  id: string;
  nome: string;
  email: string;
  avatar?: string;
  isEmailVerified?: boolean;
  lastLoginAt?: string;
}

export interface CreateUserDTO {
  nome: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  nome?: string;
  email?: string;
  avatar?: string;
}`,
    },
    {
      name: 'match.dto',
      content: `export interface MatchDTO {
  id: string;
  titulo: string;
  data: string;
  local: string;
  maxJogadores: number;
  jogadoresAtuais: number;
  status: 'agendada' | 'em_andamento' | 'concluida' | 'cancelada';
  criadorId: string;
}

export interface CreateMatchDTO {
  titulo: string;
  data: string;
  local: string;
  maxJogadores: number;
}

export interface UpdateMatchDTO {
  titulo?: string;
  data?: string;
  local?: string;
  maxJogadores?: number;
  status?: 'agendada' | 'em_andamento' | 'concluida' | 'cancelada';
}`,
    },
  ];

  for (const dto of dtos) {
    const filePath = path.join(LAYERS.application.path, 'dtos', dto.name);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, dto.content);
    console.log(`Criado DTO: ${dto.name}`);
  }
}

// Função para criar mappers na application
async function createApplicationMappers(): Promise<void> {
  const mappers = [
    {
      name: 'user.mapper',
      content: `import type { User } from '../../domain/entities/User';
import type { UserDTO, CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto';

export class UserMapper {
  static toDTO(user: User): UserDTO {
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      avatar: user.avatar,
      isEmailVerified: user.isEmailVerified,
      lastLoginAt: user.lastLoginAt?.toISOString()
    };
  }

  static toDomain(dto: CreateUserDTO): Omit<User, 'id'> {
    return {
      nome: dto.nome,
      email: dto.email,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  static toUpdate(dto: UpdateUserDTO): Partial<User> {
    return {
      ...dto,
      updatedAt: new Date()
    };
  }
}`,
    },
    {
      name: 'match.mapper',
      content: `import type { Partida } from '../../domain/entities/Partida';
import type { MatchDTO, CreateMatchDTO, UpdateMatchDTO } from '../dtos/match.dto';

export class MatchMapper {
  static toDTO(match: Partida): MatchDTO {
    return {
      id: match.id,
      titulo: match.titulo,
      data: match.data.toISOString(),
      local: match.local,
      maxJogadores: match.maxJogadores,
      jogadoresAtuais: match.jogadoresAtuais,
      status: match.status,
      criadorId: match.criadorId
    };
  }

  static toDomain(dto: CreateMatchDTO): Omit<Partida, 'id'> {
    return {
      titulo: dto.titulo,
      data: new Date(dto.data),
      local: dto.local,
      maxJogadores: dto.maxJogadores,
      jogadoresAtuais: 0,
      status: 'agendada',
      criadorId: '', // TODO: Implementar
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  static toUpdate(dto: UpdateMatchDTO): Partial<Partida> {
    return {
      ...dto,
      data: dto.data ? new Date(dto.data) : undefined,
      updatedAt: new Date()
    };
  }
}`,
    },
  ];

  for (const mapper of mappers) {
    const filePath = path.join(LAYERS.application.path, 'mappers', mapper.name);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, mapper.content);
    console.log(`Criado mapper: ${mapper.name}`);
  }
}

// Função para configurar serviços externos na infrastructure
async function configureInfrastructureServices(): Promise<void> {
  const services = [
    {
      name: 'auth.service',
      content: `import type { AuthenticatedUser } from '../../domain/entities/User';
import type { LoginDTO, RegisterDTO, AuthResponseDTO } from '../../application/dtos/auth.dto';
import { AuthMapper } from '../../application/mappers/auth.mapper';

export class AuthService {
  private static instance: AuthService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(dto: LoginDTO): Promise<AuthenticatedUser> {
    const response = await fetch(\`\${this.baseUrl}/auth/login\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dto)
    });

    if (!response.ok) {
      throw new Error('Falha na autenticação');
    }

    const data: AuthResponseDTO = await response.json();
    return AuthMapper.toDomain(data);
  }

  async register(dto: RegisterDTO): Promise<AuthenticatedUser> {
    const response = await fetch(\`\${this.baseUrl}/auth/register\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dto)
    });

    if (!response.ok) {
      throw new Error('Falha no registro');
    }

    const data: AuthResponseDTO = await response.json();
    return AuthMapper.toDomain(data);
  }

  async logout(): Promise<void> {
    const response = await fetch(\`\${this.baseUrl}/auth/logout\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Falha ao fazer logout');
    }
  }
}`,
    },
    {
      name: 'notification.service',
      content: `export class NotificationService {
  private static instance: NotificationService;

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    // TODO: Implementar integração com serviço de email
    console.log('Enviando email:', { to, subject, body });
  }

  async sendPushNotification(userId: string, title: string, body: string): Promise<void> {
    // TODO: Implementar integração com serviço de push notification
    console.log('Enviando push notification:', { userId, title, body });
  }

  async sendSMS(phone: string, message: string): Promise<void> {
    // TODO: Implementar integração com serviço de SMS
    console.log('Enviando SMS:', { phone, message });
  }
}`,
    },
  ];

  for (const service of services) {
    const filePath = path.join(LAYERS.infrastructure.path, 'services', service.name);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, service.content);
    console.log(`Criado serviço: ${service.name}`);
  }
}

// Função principal
async function main() {
  console.log('Iniciando reorganização do projeto...');
  const srcDir = path.resolve('src');
  const files = await listFiles(srcDir);

  // Criar diretórios necessários
  for (const layer of Object.values(LAYERS)) {
    for (const subdir of layer.subdirs) {
      await fs.mkdir(path.join(layer.path, subdir), { recursive: true });
    }
  }

  // Mover arquivos
  await moveFiles(files);

  // Criar interfaces no domain
  await createDomainInterfaces();

  // Criar DTOs na application
  await createApplicationDTOs();

  // Criar mappers na application
  await createApplicationMappers();

  // Configurar serviços externos na infrastructure
  await configureInfrastructureServices();

  // Remover diretórios vazios
  await removeEmptyDirs(srcDir);

  console.log('Reorganização concluída!');
}

main().catch(console.error);
