import db from '../config/database.js'

export async function getAllOrdensServico(req, res) {
    try {
        const [ordens] = await db.query('SELECT * FROM ordens_servico');
        res.json(ordens);
    } catch (error) {
        console.error('Erro ao buscar ordens de serviço:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export async function getOrdemServicoById(req, res) {
    const { id } = req.params;
    try {
        const [ordem] = await db.query('SELECT * FROM ordens_servico WHERE id = ?', [id]);
        if (ordem.length === 0) {
            return res.status(404).json({ error: 'Ordem de serviço não encontrada' });
        }
        res.json(ordem[0]);
    } catch (error) {
        console.error('Erro ao buscar ordem de serviço:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export async function createOrdemServico(req, res) {
    const { cliente_id, veiculo_id, data_inicio, data_fim, status } = req.body;
    try {
        const [result] = await db.query('INSERT INTO ordens_servico (cliente_id, veiculo_id, data_inicio, data_fim, status) VALUES (?, ?, ?, ?, ?)', [cliente_id, veiculo_id, data_inicio, data_fim, status]);
        res.status(201).json({ id: result.insertId, cliente_id, veiculo_id, data_inicio, data_fim, status });
    } catch (error) {
        console.error('Erro ao criar ordem de serviço:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export async function updateOrdemServico(req, res) {
    const { id } = req.params;
    const { cliente_id, veiculo_id, data_inicio, data_fim, status } = req.body;
    try {
        const [ordem] = await db.query('SELECT * FROM ordens_servico WHERE id = ?', [id]);
        if (ordem.length === 0) {
            return res.status(404).json({ error: 'Ordem de serviço não encontrada' });
        }
        await db.query('UPDATE ordens_servico SET cliente_id = ?, veiculo_id = ?, data_inicio = ?, data_fim = ?, status = ? WHERE id = ?', [cliente_id, veiculo_id, data_inicio, data_fim, status, id]);
        res.json({ id, cliente_id, veiculo_id, data_inicio, data_fim, status });
    } catch (error) {
        console.error('Erro ao atualizar ordem de serviço:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export async function deleteOrdemServico(req, res) {
    const { id } = req.params;
    try {
        const [ordem] = await db.query('SELECT * FROM ordens_servico WHERE id = ?', [id]);
        if (ordem.length === 0) {
            return res.status(404).json({ error: 'Ordem de serviço não encontrada' });
        }
        await db.query('DELETE FROM ordens_servico WHERE id = ?', [id]);
        res.json({ message: 'Ordem de serviço excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir ordem de serviço:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export async function getAllOrdensServicoByData(req, res) {
    const { data } = req.params;
    try {
        const [ordens] = await db.query('SELECT * FROM ordens_servico WHERE data_inicio = ?', [data]);
        res.json(ordens);
    } catch (error) {
        console.error('Erro ao buscar ordens de serviço por data:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export async function getAllOrdensServicoByClienteAndVeiculo(req, res) {
    const { cliente_id, veiculo_id } = req.params;
    try {
        const [ordens] = await db.query('SELECT * FROM ordens_servico WHERE cliente_id = ? AND veiculo_id = ?', [cliente_id, veiculo_id]);
        res.json(ordens);
    } catch (error) {
        console.error('Erro ao buscar ordens de serviço por cliente e veículo:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}