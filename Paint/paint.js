'use strict';
/* ************************** */
/*   Drawing on Paint App     */
/* ************************** */

window.addEventListener("load", function() {

    /* *************** */
    /* Creem el canvas */
    /* *************** */
    //Creem l'element canvas
    var canvasDiv = document.getElementById('canvasDiv');
    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', canvasDiv.clientWidth);
    canvas.setAttribute('height', canvasDiv.clientHeight);
    canvas.setAttribute('id', 'canvas');

    //Afegir el canvas dins del canvasDiv
    canvasDiv.appendChild(canvas);

    /* ********************* */
    /* Dibuixem en el canvas */
    /* ********************* */
    
    var ctx = canvas.getContext("2d");

    //Definim la gruixudària de la linia
    ctx.lineWidth = 5;
    
    //Definim com seràn les unions de línies
    ctx.lineJoin = 'round';
    
    //Definim com seràn les finalitzacions de línia
    ctx.lineCap = 'round';
    
    //Definim el color de la línia
    ctx.strokeStyle = 'black';

    //Creem un objecte que conté la posició del ratolí
    var mouse = {
        x: 0,
        y: 0
    };

    /* Esdeveniment mousemove */
    /* Obtenim la posició del ratolí i la guardem en l'objecte mouse */
    canvas.addEventListener('mousemove', function(e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    }, false);

    /* Esdeveniment mousedown */
    /* Quan es clica el botó ratolí es comença a dibuixar la línia al canvas*/
    canvas.addEventListener('mousedown', function(e) {
        /* Indiquem l'inici de línia */
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);

        /* Ara quan es mogui el ratolí també s'excuta la funció onPaint() */
        canvas.addEventListener('mousemove', onPaint, false);
    }, false);

    /* Esdeveniment mouseup */
    /* Quan es deixa de clicar el botó ratolí es deixa de dibuixar*/
    canvas.addEventListener('mouseup', function() {
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);

    /* Dibuixa la lína al canvas */
    var onPaint = function() {
        /* Indiquem el final de línia */
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    };


    /* ********************* */
    /*   Canviem els colors  */
    /* ********************* */
    
    //Obtenim del DOM els div de classe color
    var colors = document.getElementsByClassName("color");
    
    //A cada element li associem una acció al esdeveniment click
    for (var i = 0; i < colors.length; i++) {
        colors[i].addEventListener("click",canviarColor);
    }
    
    //Funció que canvia de color la línia que es pinta al canvas
    function canviarColor()
    {
        //this és l'objecte que representa el div que s'ha clicat en la pàgina
        ctx.strokeStyle = this.id;
    }

});