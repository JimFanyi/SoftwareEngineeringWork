let aColorBtn = document.getElementsByClassName("color-item");

for (let i = 0; i < aColorBtn.length; i++) {
    aColorBtn[i].onclick = function () {
        for (let i = 0; i < aColorBtn.length; i++) {
            activeColor = this.style.backgroundColor;
            ctx.strokeStyle = activeColor;
        }
    }

    let reSetCanvas = document.getElementById("clear");

    reSetCanvas.onclick = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    let range = document.getElementById("range");

    range.onchange = function(){
        lWidth = this.value;
    };

    let save = document.getElementById("save");

    save.onclick = function () {
        let imgUrl = canvas.toDataURL("image/png");
        let saveA = document.createElement("a");
        document.body.appendChild(saveA);
        saveA.href = imgUrl;
        saveA.download = "zspic" + (new Date).getTime();
        saveA.target = "_blank";
        saveA.click();
    };


    canvas.ontouchstart = function (e) {
        // 在这里储存绘图表面
        this.firstDot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        saveData(this.firstDot);
    ...
    }

    let undo = document.getElementById("undo");
    let historyDeta = [];

    function saveData (data) {
        (historyDeta.length === 10) && (historyDeta.shift()); // 上限为储存10步，太多了怕挂掉
        historyDeta.push(data);
    }
    undo.onclick = function(){
        if(historyDeta.length < 1) return false;
        ctx.putImageData(historyDeta[historyDeta.length - 1], 0, 0);
        historyDeta.pop()
    };

    