const { UserService } = require('../src/userService');

const dadosUsuarioPadrao = {
  nome: 'Fulano de Tal',
  email: 'fulano@teste.com',
  idade: 25,
};

describe('UserService - Suíte de Testes Refatorada (Clean)', () => {
  let userService;

  // Setup é executado antes de cada teste
  beforeEach(() => {
    userService = new UserService();
    userService._clearDB();
  });

 
  // 1. Eager Test resolvido: Separado em testes menores e focados
 
  test('deve criar um usuário com sucesso e gerar um ID válido', () => {
    // Arrange
    const { nome, email, idade } = dadosUsuarioPadrao;

    // Act
    const usuarioCriado = userService.createUser(nome, email, idade);

    // Assert
    expect(usuarioCriado.id).toBeDefined();
    expect(typeof usuarioCriado.id).toBe('string');
  });

  test('deve buscar um usuário existente pelo seu ID', () => {
    // Arrange
    const { nome, email, idade } = dadosUsuarioPadrao;
    const usuarioCriado = userService.createUser(nome, email, idade);

    // Act
    const usuarioBuscado = userService.getUserById(usuarioCriado.id);

    // Assert
    expect(usuarioBuscado).not.toBeNull();
    expect(usuarioBuscado.nome).toBe(nome);
    expect(usuarioBuscado.status).toBe('ativo');
  });

 
  // 2. Lógica Condicional resolvida: Sem loops 'for' ou 'if'
 
  test('deve desativar um usuário comum com sucesso', () => {
    // Arrange
    const usuarioComum = userService.createUser('Comum', 'comum@teste.com', 30);

    // Act
    const resultado = userService.deactivateUser(usuarioComum.id);
    const usuarioAtualizado = userService.getUserById(usuarioComum.id);

    // Assert
    expect(resultado).toBe(true);
    expect(usuarioAtualizado.status).toBe('inativo');
  });

  test('não deve permitir a desativação de um usuário administrador', () => {
    // Arrange
    const usuarioAdmin = userService.createUser('Admin', 'admin@teste.com', 40, true);

    // Act
    const resultado = userService.deactivateUser(usuarioAdmin.id);
    const usuarioAtualizado = userService.getUserById(usuarioAdmin.id);

    // Assert
    expect(resultado).toBe(false);
    expect(usuarioAtualizado.status).toBe('ativo');
  });

 
  // 3. Teste Frágil resolvido: Validando comportamento, não string exata
 
  test('deve conter as informações cruciais dos usuários dentro do relatório', () => {
    // Arrange
    const usuario1 = userService.createUser('Alice', 'alice@email.com', 28);
    const usuario2 = userService.createUser('Bob', 'bob@email.com', 32);

    // Act
    const relatorio = userService.generateUserReport();
    
    // Assert
    expect(relatorio).toContain('Alice');
    expect(relatorio).toContain('Bob');
    expect(relatorio).toContain(usuario1.id);
    expect(relatorio).toContain(usuario2.id);
  });
  
 
  // 4. Asserção Silenciosa resolvida: Sem try/catch
 
  test('deve lançar uma exceção ao tentar criar um usuário menor de idade', () => {
    // Arrange
    const nome = 'Menor';
    const email = 'menor@email.com';
    const idade = 17;

    // Act & Assert (O Jest avalia a função inteira de uma vez)
    expect(() => {
      userService.createUser(nome, email, idade);
    }).toThrow('O usuário deve ser maior de idade.');
  });

  // 5. Débito Técnico resolvido: Implementado sem o .skip
  test('deve retornar a mensagem padrão quando o relatório for gerado sem usuários', () => {
    // Arrange (Não é necessário criar usuários, pois o banco é limpo no beforeEach)
    
    // Act
    const relatorio = userService.generateUserReport();

    // Assert
    expect(relatorio).toContain('Nenhum usuário cadastrado');
  });
});