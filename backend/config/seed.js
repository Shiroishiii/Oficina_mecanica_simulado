import connection from './config/database.js';
import bcrypt from 'bcrypt';

try {

    // USUÁRIOS
    const senha = await bcrypt.hash('12345678', 10);

    await connection.query(`
        INSERT INTO usuarios (nome, email, senha)
        VALUES
        ('Administrador', 'admin@oficina.com', ?),
        ('Joao Silva', 'joao@oficina.com', ?),
        ('Maria Souza', 'maria@oficina.com', ?)
    `, [senha, senha, senha]);


    // CLIENTES
    await connection.query(`
        INSERT INTO clientes
        (nome, cpf, telefone, email, endereco)
        VALUES
        ('Carlos Oliveira', 'CPF_CRIPTOGRAFADO_001', '(48) 99999-1111', 'carlos@email.com', 'Rua das Flores, 100'),
        ('Ana Pereira', 'CPF_CRIPTOGRAFADO_002', '(48) 98888-2222', 'ana@email.com', 'Rua Central, 200'),
        ('Pedro Santos', 'CPF_CRIPTOGRAFADO_003', '(48) 97777-3333', 'pedro@email.com', 'Avenida Brasil, 300')
    `);


    // VEÍCULOS
    await connection.query(`
        INSERT INTO veiculos
        (cliente_id, placa, marca, modelo, ano)
        VALUES
        (1, 'ABC1D23', 'Toyota', 'Corolla', 2020),
        (2, 'DEF4G56', 'Honda', 'Civic', 2021),
        (3, 'HIJ7K89', 'Volkswagen', 'Golf', 2019)
    `);


    // ORDENS DE SERVIÇO
    await connection.query(`
        INSERT INTO ordens_servico
        (cliente_id, veiculo_id, descricao, valor, data_agendamento, status)
        VALUES
        (1, 1, 'Troca de oleo e filtro', 250.00, '2026-10-01 09:00:00', 'Agendada'),
        (2, 2, 'Revisao do sistema de freios', 480.00, '2026-10-02 10:30:00', 'Agendada'),
        (3, 3, 'Alinhamento e balanceamento', 180.00, '2026-10-03 14:00:00', 'Agendada')
    `);

    console.log('Banco populado com sucesso!');

} catch (error) {

    console.error('Erro ao popular banco:', error);

} finally {

    await connection.end();

}