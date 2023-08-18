<html>
<head>
    <style>
        @page {
            margin: 0;
            border: 0;
        }

        * {
            align-items: center;
            margin: 0;
            border: 0;
            font-family: Arial, sans-serif;
        }

        .titulo {
            background: rgb(19, 113, 115);
            color: white;
            text-align: center;
        }

        .titulo p {
            position: relative;
            height: 50px;
            text-align: center;
            top: 15px;
            font-size: 18px;
        }

        .vendedora {
            font-size: 9px;
            position: relative;
            text-align: center;
            color: rgb(100, 100, 100);
        }

        .tor {
            background: rgb(200, 200, 200);
        }

        table {
            border-collapse: collapse;
            width: 100%;
            table-layout: fixed;

        }

        table thead {
            border: 1px solid rgb(200, 200, 200);
            border-color: rgb(200, 200, 200);
            background: rgb(200, 200, 200);
            font-size: 9px;
        }

        table tbody {
            font-size: 10px;
            background: white !important;
        }

        td {
            padding: 10px 10px;
            text-align: center;
            border: none;
        }

        l {
            color: rgb(19, 113, 115);
            font-weight: bold;
        }

        .ti1 td {
            border: 1px solid rgb(200, 200, 200);
            padding: 10px 80px;
            font-family: arial;
        }

        .infos {
            padding: 20px;
        }

        .infos lg {
            color: rgb(19, 113, 115);
            font-size: 13px;
            font-weight: bolder;
        }

        tbody td {

            border-bottom: 1px solid rgb(200, 200, 200);
        }

        footer {
            position: fixed;
            bottom: 0;
            background: rgb(19, 113, 115);
            width: 100%;
            height: 100px;
        }

        img {
            max-width: 100%;
        }

        p1 img {
            width: 15px;
        }
    </style>
</head>
<body>
<?php
setlocale(LC_ALL, 'pt_BR', 'pt_BR.utf-8', 'pt_BR.utf-8', 'portuguese');
date_default_timezone_set("America/Sao_Paulo");
$topicoPdf = $_POST['checkin'][0];
@$topico = ucfirst(strftime("%B", strtotime($topicoPdf)));
?>

<header><img src="<?php echo INCLUDE_PATH ?>img/top.jpeg" alt=""></header>
<div class="vendedora">
    <p>
    <p><b>Consultor(a): <?php echo $_SESSION['nome']; ?></b></p>
    e-mail:
    <p1><?php echo $_SESSION['email']; ?></p1>
    <p1>Telefone:
        <img src="<?php echo INCLUDE_PATH ?>img/whats.jpg">
        <?php
        if ($_SESSION["department"] == 1) {
            echo "14-99181-6650";
        } else {
            echo "14-99625-7707";
        }
        ?></p1>
    </p>
    <p>
        <b>
            DATA DA
            COTAÇÃO: <?php echo date("d/m/Y H:i", strtotime($hoje)) . " - VÁLIDADE DA COTAÇÃO: " . date("d/m/Y", strtotime($validade)); ?>
        </b></p>

</div><!-- vendedora -->
<div class="titulo">
    <p contenteditable="true"><b><?php echo($topico); ?></b></p>
</div>

<table class="tor" border="0">
    <thead>
    <tr>
        <td></td>
        <td><b>Período da Viagem</b></td>
        <td><b>Valor do Apartamento</b></td>
        <td><b>Especial para você!</b></td>
    </tr>
    <tr>
        <td></td>
        <td>Check in
            <l>18h</l>
            e <br>Check out as
            <l>15h</l>
        </td>
        <td><b>30% via depósito + saldo restante em até 06x no check-in.</b></td>
        <td>
            <l>Á VISTA</l>
            ou 30% via depósito + saldo restante em até 03x no check-in.
        </td>
    </tr>
    </thead>

    <tbody>
    <?php
    for ($i = 0; $i < $countRow; $i++) {
        $day_plus = $_POST["day_plus"][$i];
        $checkin = $_POST['checkin'][$i];
        $checkout = $_POST['checkout'][$i];
        $temporada = $_POST['temporada'][$i];
        $categoria = $_POST['categoria'][$i];
        $cortezia = $_POST["cortezia"][$i];
        $categoria = Painel::select('_categorias', 'id=?', array($categoria))['completo'];
        $adutos = $_POST['adutos'][$i];
        $adtIni = strpos($adutos, ":") + 2;
        $adtFin = strpos($adutos, "R") - 9;
        $adutos = substr($adutos, $adtIni, $adtFin);
        if (strlen($adutos) == 1)
            $adutos = '0' . $adutos . ' ADT';
        else
            $adutos = $adutos . ' ADT';
        $qtde_chd = (strlen($_POST['qtde_crianças'][$i]) == 1) ? '0' . $_POST['qtde_crianças'][$i] : $_POST['qtde_crianças'][$i];
        $crianças = ($_POST['crianças_pdf'][$i] != '') ? '<br>' . $qtde_chd . ' CHD de (' . $_POST['crianças_pdf'][$i] . ') ano(s)' : '';
        $qtde_pet = (strlen($_POST['qtde_pet'][$i]) == 1) ? '0' . $_POST['qtde_pet'][$i] : $_POST['qtde_pet'][$i];
        $pet = $_POST['pet_pdf'][$i];
        if ($pet != '') {
            $db_pet = Painel::selectAll("_pet");
            foreach ($db_pet as $key => $value) {
                $pet = preg_replace('/' . $value['id'] . '/', $value['porte'], $pet);
            }

            $pet = '<br>' . $qtde_pet . ' PET de (' . $pet . ')  PORTE';
        }
        $chdCortezia = ($cortezia) ? "<br> 01 chd CORTESIA" : "";
        $requerimentos = ($_POST['requerimentosOnly'][$i] != '') ? '<br>' . $_POST['requerimentosOnly'][$i] : '';
        $tarifario_cheio = $_POST['tarifario_cheio'][$i];
        $tarifario_cheio = $tarifario_cheio + (0.10 * $tarifario_cheio);
        $tarifario_real = $_POST['tarifario_real'][$i];

        $day_plus_message = "";
        if ($day_plus)
            $day_plus_message = "<br>Com diaria cortesia";

        echo '<tr class="dif">';
        echo '<td>' . mb_strtoupper($categoria, 'UTF-8') . '<br>' . $adutos . $crianças . $pet . '<l>' . $chdCortezia . $requerimentos . $day_plus_message . '</l> </td>';
        echo '<td>' . date("d/m/Y", strtotime($checkin)) . ' A ' . date("d/m/Y", strtotime($checkout)) . '</td>';
        echo '<td>R$ ' . number_format(ceil($tarifario_cheio), 2, ",", ".") . '</td>';
        echo '<td><l>R$ ' . number_format(ceil($tarifario_real), 2, ",", ".") . '</l></td></tr>';
    } ?>
    </tbody>

</table>

<table class="ti1">
    <tr>
        <td>
            <p>Não aceitamos cheques de terceiros, pessoa jurídica, comprovantes de agendamento de transferência, DOC,
                depósito em caixa eletrônico e comprovantes em prints de tela.
                Trabalhamos apenas com as bandeiras de cartão: <b>Mastercard/Visa/Elo.
                    <l>Não aceitamos outras bandeiras.
                        <l><b></p>
        </td>
    </tr>
    <tr>
        <td>
            <l>PETS</l>
            <b> são muito bem-vindos em nosso hotel fazenda, porém como nossa política é satisfazer a todos, informamos
                que a ala luxo (800) é a única do nosso hotel que não recebe animais de estimação. Caso tenha um
                animalzinho informe seu consultor para remanejamento de apartamento.
                É obrigatório o envio da carteira de vacinação do PET e regulamento animal assinado.</b></td>
    </tr>
    <tr>
        <td><p>É de suma importância comunicar com antecedência que trará seu animal de estimação, visto que os mesmos
                só poderão ser acomodados nas alas PADRÃO VARANDA e sob aviso prévio.</p></td>
    </tr>
    <tr>
        <td><b>Informação importante</b><br />
        <p>No período de baixa temporada recebemos alguns grupos escolares, pode acontecer de termos crianças durante sua estadia.</p></td>
    </tr>
</table>

<div class="titulo">
    <p><b>OLHA QUE LEGAL O QUE APROVEITARÁ EM NOSSO HOTEL:</b></p>
</div>

<table class="infos">
    <colgroup>
        <col style="width:30%">
        <col style="width:70%">
    </colgroup>
    <tr>
        <td style="width:30%">
            <lg>ALIMENTAÇÃO</lg>
        </td>
        <td style="padding: 10px 70px; text-align: left;"><b>PENSÃO COMPLETA:</b> Café da manhã, almoço e jantar + suco
            natural do dia e sobremesa. Outras bebidas e consumo cobrados à parte. <b>OBS</b>. As bebidas adquiridas
            fora do hotel possuem taxa rolha por unidade. Consulte Tarifas.<br><b>IMPORTANTE:</b> Trabalhamos com regime
            de pensão completa no sistema "Buffet Self Service" à vontade acima de 21 apartamentos. Quando há um fluxo
            menor de hóspedes, servimos o sistema "À La Carte" com a opção também à vontade.
        </td>
    </tr>
    <tr>
        <td>
            <lg>RELAX</lg>
        </td>
        <td style="padding: 10px 70px; text-align: left;">Aproveite a jacuzzi (1h por apartamento) reservar na recepção;
            gazebos para leitura; bosque com redário; mesa de carteado; bilhar e ping-pong
        </td>
    </tr>
    <tr>
        <td>
            <lg>HORA DE SE DIVERTIR</lg>
        </td>
        <td style="padding: 10px 70px; text-align: left;">Que tal aproveitar a estadia para curtir: arco e flecha;
            passeio de bike; campeonatos de futebol e vôlei; paredão de escalada; touro mecânico; 02 tobogãs; 05
            piscinas e muito mais.
        </td>
    </tr>
    <tr>
        <td>
            <lg>PROGRAMAÇÃO HOTEL</lg>
        </td>
        <td style="padding: 10px 70px; text-align: left;">Monitoria especializada para adultos e crianças a partir de 04
            anos. Atividades com a equipe desde o café da manhã até o jantar
        </td>
    </tr>
    <tr>
        <td>
            <lg>LAGOA ENCANTADA</lg>
        </td>
        <td style="padding: 10px 70px; text-align: left;">Lagoa Encantada: é uma piscina temática, aquecida e coberta
            com variação de temperatura entre 28º a 30ºC. Ambientalizada em uma caverna cenográfica, a Lagoa Encantada
            possui iluminação cênica computadorizada, som digital, cachoeiras, jatos de água, estruturas de pontos de
            jacuzzi. <br />
            <l>IMPORTANTE:</l>
            Ressaltando que ocasionalmente os jatos, podem não estar ligados, mas a piscina estará aberta para
            utilização. Isso ocorre para não esfriar a água nos dias mais frios. <br />
            Toda segunda-feira, a Lagoa Encantada ficará fechada para manutenção. <br />
            <l>Horário de funcionamento:</l>
            <b> Terça a Sexta-feira: das 16h00 às 18h30. Sábado e Domingo das 10h30 às 12h30 e das 16h às 18h30.</b>
        </td>
    </tr>
    <tr>
        <td>
            <lg>OBSERVAÇÃO DOS ASTROS</lg>
        </td>
        <td style="padding: 10px 70px; text-align: left;">Faça a sua reserva antecipadamente para a visita na Fundação
            CEU e ganhe 20% de descontos nos ingressos integrais! www.fundacaoceu.org.br
        </td>
    </tr>
    <tr>
        <td>
            <lg>RADICAL!</lg>
        </td>
        <td style="padding: 10px 70px; text-align: left;">Temos parceria com as principais agências de ecoturismo da
            cidade, então podem adquirir em nossa recepção ou fazer uma reserva antecipada para atividades como Rafting,
            Boia Cross, Rapel, Tirolesas e outras.
        </td>
    </tr>
</table>


<footer>
</footer>
</body>
</html>