var jogo = {}; 
var tecla = {   
    C: 38, 
    B: 40,    
    E: 37,   
    D: 39,    
    T: 32    
};

function start() {
    $('#start').hide();
    $('#gameover').hide();
    $('#area_jogo').append("<div id='player' class='player'></div>");
    $('#area_jogo').append("<div id='nave' class='nave'></div>");
    $('#area_jogo').append("<div id='tanque' class='tanque'></div>");
    $('#area_jogo').append("<div id='pessoa' class='pessoa'></div>");
    $('#area_jogo').append("<div id='vida_player' class='vida'></div>");
 
    jogo.pressionou = [];

    $(document).keydown(function (e) {
        jogo.pressionou[e.which] = true;
    });

    $(document).keyup(function (e) {
        jogo.pressionou[e.which] = false;
    });

    setInterval(loop, 30);
}

function loop() {
    movimentacenario();
    movimentaplayer();
    movimentanave();
    movimentatanque();
    movimentapessoa();
}

function movimentacenario() {
    var posicao = parseInt($('.area_jogo').css("background-position"));
    $('.area_jogo').css("background-position", posicao - 1);
}

function movimentaplayer() {
    if (jogo.pressionou[tecla.C]) {
        var topo = parseInt($('#player').css("top"));
        $('#player').css("top", topo - 8);
        if (topo <= 10)
            $('#player').css("top", 10);
    }

    if (jogo.pressionou[tecla.B]) {
        var down = parseInt($('#player').css("top"));
        $('#player').css("top", down + 8);
        if (down >= 256)
            $('#player').css("top", 256);
    }

    if (jogo.pressionou[tecla.D]) {
        var left = parseInt($('#player').css("left"));
        $('#player').css("left", left + 8);
        if (left >= 560)
            $('#player').css("left", 560);
    }

    if (jogo.pressionou[tecla.E]) {
        var left = parseInt($('#player').css("left"));
        $('#player').css("left", left - 8);
        if (left <= 0)
            $('#player').css("left", 0);
    }

    if (jogo.pressionou[tecla.T]) {
        if ($('#tiro').length == 0) {
            var pos_y = parseFloat($('#player').css("top"));
            var pos_x = parseFloat($('#player').css("left"));
            $('#area_jogo').append("<div id='tiro' class='tiro'></div>");
            $('.tiro').css("left", pos_x + 100);
            $('.tiro').css("top", pos_y + 30);
        }
    }
}

function movimentanave() {
    var left = parseInt($('#nave').css("left"));
    $('#nave').css("left", left - 2);
    if (left <= -10) {
        nasce_nave();
    }

    if ((left <= 590) && (left >= 580) && ($('#inimigo_tiro').length == 0)) {
        player_local = parseInt($('#player').css('top'));

        var topo = parseInt($('#nave').css("top"));
        $('#area_jogo').append("<div id='inimigo_tiro' class='tiro_nave'></div>");
        $('.tiro_nave').css("top", topo);
    }

}

function nasce_nave() {
    var local = parseInt(Math.random() * 250);
    $('#nave').css("top",local);
    $('#nave').css("left",600);
    if($('#inimigo_tiro').length>0)
        $('#inimigo_tiro').remove();
}


function movimentatanque() {
    var left = parseInt($('#tanque').css("left"));
    $('#tanque').css("left", left - 1.1);
    if (left <= 0) {
        $('#tanque').hide();
        setTimeout(function () {
            $('#tanque').css("left", 610);
            $('#tanque').show()
        }, 5000);
    }
}

function movimentapessoa() {
    var left = parseInt($('#pessoa').css("left"));
    $('#pessoa').css("left", left + 1);
    if (left >= 640)
        $('#pessoa').css("left", 640);
}
