$(document).ready(function (){
    $('#modalCadastro').modal({
        show: false,
        backdrop: 'static',
        keyboard: false
    })

    $('#modalCadastro').on('shown.bs.modal', function () {
        $('#nome').focus();
    })


    $('#modalCadastro').on('hidden.bs.modal', function () {
        $('#nome').val("");
        $('#telefone').val("");
    });


    $('#adicionar').click(function () {
       AdicionarTabela();
    });


    AdicionarTabela = function () {
        var novaLinha = $('<tr>');
        var colunas = '';
        var nome = $('#nome').val();
        var telefone = $('#telefone').val();

        colunas += '<td>'+nome+'</td>';
        colunas += '<td>'+telefone+'</td>';
        colunas += '<td>';
        colunas += '<button onclick="RemoverLinha(this)" class="btn btn-sm btn-outline-danger fa fa-2x fa-trash"></button>';
        colunas += '</td>';

        novaLinha.append(colunas);
        $('#tabela-cadastro').append(novaLinha);

        return false;
    };

    RemoverLinha = function (handler) {
        var tr = $(handler).closest('tr');

        tr.fadeOut(400, function () {
            tr.remove();
        });

        return false;
    };
});