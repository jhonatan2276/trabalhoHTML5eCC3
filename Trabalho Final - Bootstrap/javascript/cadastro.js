$(document).ready(function (){
    //Função de Buscar o CEP
    $('#btnBuscaCep').click(function () {
        buscaCep()
    })
    //OU
    $('#cadCep').blur(function () {
        buscaCep()
    })

    function buscaCep() {
        //Elimina "caracteres" e deixa o CEP somente com números
        var cep = $('#cadCep').val().replace(/\D/g, '');

        if (cep != '') {
            //Expressão regular para validar o CEP
            var validaCep = /^[0-9]{8}$/;

            if (validaCep.test(cep)) {
                $("#cadRua").val("Carregando...");
                $("#cadBairro").val("Carregando...");
                $("#cadCidade").val("Carregando...");
                $("#cadEstado").val("...");

                $.getJSON("https://viacep.com.br/ws/"+cep+"/json/", function(dados) {
                    if (!("erro" in dados)) {
                        $('#cadRua').val(dados.logradouro);
                        $('#cadBairro').val(dados.bairro);
                        $('#cadCidade').val(dados.localidade);
                        $('#cadEstado').val(dados.uf);

                    } else {
                        alert ('CEP Não Encontrado');
                        limpa_cep();
                    } //end if (!("erro" in dados)) {
                });
            } else {
                alert ('CEP Inválido');
                limpa_cep();
            }//end if (validaCep.test(cep))
        } else {
            limpa_cep();
            console.log('CEP Vazio');
        }//end if (cap != '')
    };

    //Limpa os campos quando necessario
    function limpa_cep() {
        $("#cadCep").val("");
        $("#cadRua").val("");
        $("#cadBairro").val("");
        $("#cadCidade").val("");
        $("#cadEstado").val("");
    };

    //Máscaras
    $('#cadCep').mask('00000-000');
    $('#cadDataNascimento').mask('00/00/0000');
    //Especial para máscara de telefone 8 ou 9 digitos
    var mascaraTelefone = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },
        mascaraOptions = {
            onKeyPress: function(val, e, field, options) {
                field.mask(mascaraTelefone.apply({}, arguments), options);
            }};

    $('#cadTelefone').mask(mascaraTelefone, mascaraOptions);

    //Validação de Formulário
    $('#formulario').validate({
        rules: {
            nome: {
                required: true,
                minlength: 5
            },
            email: {
                required: true,
                email: true
            },
            telefone: {
                required: true,
                minlength: 14
            },
            dataNascimento: {
                required: true,
                date: true
            },
            /*cep: {
                required: true
            },*/
            cidade: {
                required: true
            },
            estado: {
                required: true
            },
            rua: {
                required: true
            },
            bairro: {
                required: true
            },
            numero: {
                required: true
            }
        },
        messages: {
            nome: {
                required: "Campo Obrigatório",
                minlength: "O nome deve ter no mínímo 5 digitos"
            },
            email: {
                required: "Campo Obrigatório",
                email: "Email Inválido"
            },
            telefone: {
                required: "Campo Obrigatório",
                minlength: "O telefone deve ter no mínimo 10 digitos (com DDD)",

            },
            dataNascimento: {
                required: "Campo Obrigatório",
            },
            /*cep: {
                required: "Campo Obrigatório"
            },*/
            cidade: {
                required: "Campo Obrigatório"
            },
            estado: {
                required: "Campo Obrigatório"
            },
            rua: {
                required: "Campo Obrigatório"
            },
            bairro: {
                required: "Campo Obrigatório"
            },
            numero: {
                required: "Campo Obrigatório"
            }
        }
    });

    //Método adicional para datas no formato DD-MM-AAAA
    $.validator.addMethod("date", function(value, element) {
            var check = false;
            var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
            if(re.test(value)){
                var adata = value.split('/');
                var gg = parseInt(adata[0],10);
                var mm = parseInt(adata[1],10);
                var aaaa = parseInt(adata[2],10);
                var xdata = new Date(aaaa,mm-1,gg);
                if ((xdata.getFullYear() == aaaa) && (xdata.getMonth () == mm - 1) && (xdata.getDate() == gg)) {
                    var dataDigitada = gg+'/'+mm+'/'+aaaa;
                    var data1 = dataDigitada;
                    var partesData1 = data1.split("/");
                    var data = new Date(partesData1[2], partesData1[1] - 1, partesData1[0]);
                    var dataInicial = '01/01/1940';
                    var dataInicialComp = new Date(dataInicial.replace(/(\d{2})\/(\d{2})\/(\d{4})/,'$2/$1/$3'));

                    //Se a data inserida for maior que "HOJE"
                    if (data > new Date()) {
                        check = false;
                    } else
                    //Se a data inserida for menor que a data inicial
                    if (data < dataInicialComp) {
                        check = false;
                    } else {
                        check = true;
                    }
                } else
                    check = false;
            } else
                check = false;
            return this.optional(element) || check;
        },
        "Insira uma data válida"
    );
});