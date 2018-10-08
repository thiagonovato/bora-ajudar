import React, { Component } from 'react'
import base from './base'
import { error } from 'util';

export default class AdminCampanha extends Component {
    constructor(props) {
        super(props)
        this.state = {
            campanhas: {}
        }
    }

    componentDidMount() {
        base.syncState('campanhas', {
            context: this,
            state: 'campanhas',
            asArray: false
        })

        this.renderCampanha = this.renderCampanha.bind(this)
        this.removeCampanha = this.removeCampanha.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    removeCampanha(key) {
        base.remove('campanhas/' + key, err => {
        })
    }

    handleSave() {
        const nome = this.nome.value
        const descricao = this.descricao.value
        const subTitulo = this.subTitulo.value
        const tipo = this.state.tipo
        const comoDoar = this.state.tipo === 'produtos' ? this.comoDoar.value : null
        const meta = this.state.tipo === 'doacao' ? this.meta.value : null
        const doado = this.state.tipo === 'doacao' ? this.doado.value : null

        base.push('campanhas', {
            data: { nome, descricao, subTitulo, tipo, comoDoar, meta, doado },
            then: err => {
                if (!err) {
                    this.nome.value = ''
                    this.descricao.value = ''
                    this.subTitulo.value = ''
                    this.setState({ tipo: '' })
                    if (this.comoDoar) {
                        this.comoDoar.value = ''
                    }
                    if (this.meta) {
                        this.meta.value = ''
                    }
                    if (this.doado) {
                        this.doado.value = ''
                    }

                }
            }
        })
    }

    renderCampanha(key, campanha) {
        return (
            <li key={key}>
                {campanha.nome}
                &nbsp;
                <button onClick={() => 1}>Editar</button>
                <button onClick={() => this.removeCampanha(key)}>Remover</button>
            </li>
        )
    }

    render() {
        return (
            <div>
                <h1>Campanhas</h1>
                <h2>Nova Campanha</h2>
                Campanha: <input type='text' ref={ref => this.nome = ref} /><br />
                Sub Título: <input type='text' ref={ref => this.subTitulo = ref} /><br />
                Descrição: <textarea ref={ref => this.descricao = ref} /><br />
                Tipo: <br />
                <input type='radio' name='tipo' onClick={() => this.setState({ tipo: 'doacao' })} />Doação<br />
                <input type='radio' name='tipo' onClick={() => this.setState({ tipo: 'produtos' })} />Produtos<br />

                {this.state.tipo === 'doacao' &&
                    <div>
                        <h4>Doação</h4>
                        Meta: <input type='text' ref={ref => this.meta = ref} /><br />
                        Quanto já foi doado: <input type='text' ref={ref => this.doado = ref} defaultValue={0} />
                    </div>
                }

                {this.state.tipo === 'produtos' &&
                    <div>
                        <h4>Produtos</h4>
                        Como doar: <input type='text' ref={ref => this.comoDoar = ref} />
                    </div>
                }

                <button onClick={this.handleSave}>Salvar nova campanha</button>
                <ul>
                    {Object.keys(this.state.campanhas).map(key => this.renderCampanha(key, this.state.campanhas[key]))}
                </ul>
            </div>
        )
    }
}