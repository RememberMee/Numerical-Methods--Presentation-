let countRow = 2;

function GaussRoots(a, b) {
    let R, C, N;
    N = b.length;
    R = a[0].length;
    C = a[1].length;

    let _b = [];
    var mass = [];
    for (var i = 0; i < R; i++) {
        mass[i] = [];
        for (var j = 0; j < C; j++) {
            mass[i][j] = undefined;
        }
    }

    let x = [];
    for (let i = 0; i < R; i++) {
        _b[i] = b[i];
        x[i] = 0;
        for (let j = 0; j < C; j++) {
            mass[i][j] = a[i][j];
        }
    }

    for (let i = 0; i < R - 1; i++) {
        if (mass[i][i] == 0) {
            for (let k = i + 1; k < R; k++) {
                if (mass[k][i] != 0) {
                    for (let m = 0; m < C; m++) {
                        mass[i][m] += mass[k][m];
                    }
                    _b[i] += _b[k];
                    break;
                }
            }
        }

        let coef;
        for (let j = i + 1; j < R; j++) {
            coef = mass[j][i] / mass[i][i];
            _b[j] -= _b[i] * coef;
            for (let k = i; k < C; k++) {
                mass[j][k] -= mass[i][k] * coef;
            }
        }
    }

    for (let i = N - 1; i >= 0; i--) {
        for (let j = N - 1; j > i; j--) {
            _b[i] -= x[j] * mass[i][j];
        }
        x[i] = _b[i] / mass[i][i];
    }

    return x;
}

function fillArray() {
    for (let i = 0; i < countRow - 1; i++) {
        for (let j = 0; j < countRow - 1; j++) {
            document.getElementById('arr_input' + i + '' + j).value = Math.floor(Math.random() * 20);
        }
        document.getElementById('b_input' + i).value = Math.floor(Math.random() * 20);
    }
    renderToStr();
}

function addRow() {
    document.querySelector('.arr_row').innerHTML = "";
    for (let j = 0; j < countRow; j++) {
        let row = document.createElement('label');
        row.className = "input" + j;
        let str = '';
        for (let i = 0; i < countRow; i++) {
            str += `<input type="text" id="arr_input` + j + "" + i + `" size = "3" onchange = "` + renderToStr() + "\"> ";
                katex.renderToString("x" + i);
            if (i != countRow - 1)
                str += " + ";
        }
        row.innerHTML = str +
            ` = <input type="text" id="b_input` + j + `" size="3"><br>`;
        document.querySelector('.arr_row').appendChild(row);
    }
    countRow += 1;
}

function removeRow() {
    if (countRow > 2) {
        countRow -= 2;
        addRow();
    }
}

function renderToStr() {
    if(document.querySelector("katex_output") == null) {
        var elem = document.createElement('div');
        elem.className = "katex_output";
        document.querySelector('.arr_row').appendChild(elem);
    }
    document.querySelector(".katex_output").innerHTML = "";
        
    for (let i = 0; i < countRow - 1; i++) {
        let str = "";
        let value;
        for (let j = 0; j < countRow - 1; j++) {
            value = document.getElementById('arr_input' + i + '' + j).value;
            if(value != null && value != 0) {
                str += value + "x_{" + j + "}";
                if(j != countRow - 2) {
                    str += " + ";
                }
            }
        }
        value = document.getElementById('b_input' + i).value;
        if(value != null) {
            str += " = " + value + "\\\\";
        }
        document.querySelector(".katex_output").innerHTML += katex.renderToString(str);
    }
}

addRow();

list = document.getElementById('arr_row').getElementsByTagName('*');
list.forEach(element => { 
    element.addEventListener("DOMSubtreeModified", function() { 
        renderToStr(); 
    })
}); 