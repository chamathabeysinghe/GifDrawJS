
(function (window) {
    'user strict'
    var Bayside ={};
    var Data = {name:"Chamath"};
    function defineBayside() {
        Bayside.alert = function () {
            Data.name="Ugly";
        };
        Bayside.init = function (canvas2d) {
            canvas = canvas2d;
            ctx = canvas2d.getContext("2d");
            ctx.lineWidth = '3';
            canvas2d.addEventListener('mousedown',startDraw,false);
            canvas2d.addEventListener('mousemove', draw, false);
            canvas2d.addEventListener('mouseup', endDraw, false);

        };
        Bayside.clear = function () {
            clearCanvas();
        };
        Bayside.animateDraw = function(){
            console.log("STarting render");
            clearCanvas();
            animate();
        };
        return Bayside;
    }
    // window.Bayside = defineBayside();
    if(typeof(window.Bayside) === 'undefined'){
        window.Bayside=defineBayside();
    }
    var canvas;
    var ctx;

    // create a flag
    var isActive = false;

    // array to collect coordinates
    var plots = [];
    var plotsCollection = []

    function draw(e) {
        if(!isActive) return;

        // cross-browser canvas coordinates
        var x = e.offsetX || e.layerX - canvas.offsetLeft;
        var y = e.offsetY || e.layerY - canvas.offsetTop;

        plots.push({x: x, y: y});

        drawOnCanvas(plots);
    }

    function startDraw(e) {
        isActive = true;
    }

    function endDraw(e) {
        isActive = false;
        plotsCollection.push(plots);
        // empty the array
        plots = [];
    }

    function drawOnCanvas(plots) {
        ctx.beginPath();
        ctx.moveTo(plots[0].x, plots[0].y);

        for(var i=1; i<plots.length; i++) {
            ctx.lineTo(plots[i].x, plots[i].y);
        }
        ctx.stroke();
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    var sampleIndex = 0;
    function animate(){
        if(sampleIndex>=plotsCollection.length){
            sampleIndex = 0;
            console.log("Saving");
            return;
        }
        var plot = plotsCollection[sampleIndex];
        console.log("Sample Index is: "+sampleIndex);
        animateSingleObject(plot,1);

    }

    function animateSingleObject(plot,objectIndex){
        if(objectIndex>=plot.length){
            sampleIndex+=1;
            animate();
            return;
        }
        setTimeout(function(){
            ctx.beginPath();
            ctx.moveTo(plot[0].x, plot[0].y);
            for(var i=1; i<objectIndex; i++) {
                ctx.lineTo(plot[i].x, plot[i].y);
            }
            ctx.stroke();
            animateSingleObject(plot,objectIndex+1);
        },10);
    }
    })(window);