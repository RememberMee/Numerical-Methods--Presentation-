let gcountRow = 2;
let lucountRow = 2;

function gaussRoots(a, b, N) {
    let _b = [];
    var mass = [];
    for (let i = 0; i < N; i++) {
        _b[i] = b[i];
        mass[i] = [];
        for (let j = 0; j < N; j++) {
            mass[i][j] = a[i][j];
        }
    }

    for (let i = 0; i < N - 1; i++) {
        if (mass[i][i] == 0) {
            for (let k = i + 1; k < N; k++) {
                if (mass[k][i] != 0) {
                    for (let m = 0; m < N; m++) {
                        mass[i][m] += mass[k][m];
                    }
                    _b[i] += _b[k];
                    break;
                }
            }
        }

        let coef;
        for (let j = i + 1; j < N; j++) {
            coef = mass[j][i] / mass[i][i];
            _b[j] -= _b[i] * coef;
            for (let k = i; k < N; k++) {
                mass[j][k] -= mass[i][k] * coef;
            }
        }
    }
    
    let x = []
    for (let i = N - 1; i >= 0; i--) {
        for (let j = N - 1; j > i; j--) {
            _b[i] -= x[j] * mass[i][j];
        }
        x[i] = _b[i] / mass[i][i];
    }

    return x;
}

function LURoots(a, b, N) {
    let l = [];
    let u = [];

    for (let i = 0; i < N; i++) {
        l[i] = [];
        u[i] = [];
        for (let j = 0; j < N; j++) {
            if (i == j)
                l[i][j] = 1;
            else
                l[i][j] = 0;
            u[i][j] = 0;
        }
    }

    let  t;
    for (let  i = 0; i < N; i++) {
        for (let  j = 0; j < N; j++) {
            t = 0;
            if (i <= j) {
                for (let  k = 0; k < i; k++) {
                    t += l[i][k] * u[k][j];
                }
                u[i][j] = a[i][j] - t;
            } else {
                for (let  k = 0; k < j; k++) {
                    t += l[i][k] * u[k][j];
                }
                l[i][j] = (a[i][j] - t) / u[j][j];
            }
        }
    }

    let y = gaussRoots(l, b, N);
    let x = gaussRoots(u, y, N);

    return x;
}

function renderRoots(num) {   
    let N;
    let x;
    if(num == 0){
        N = gcountRow - 1;
    } else {
        N = lucountRow - 1;
    }

    let b = [];
    var a = [];
    for (var i = 0; i < N; i++) {
        b[i] = document.querySelectorAll('.arr_row')[num].querySelector('#b_input' + i).value;
        a[i] = [];
        for (var j = 0; j < N; j++) {
            a[i][j] = document.querySelectorAll('.arr_row')[num].querySelector('#arr_input' + i + '' + j).value;
        }
    }

    if(num == 0){
        x = gaussRoots(a, b, N);
    } else {
        x = LURoots(a, b, N);
    }

    if(document.querySelectorAll('.arr_row')[num].querySelector(".katex_output_roots") == null) {
        var elem = document.createElement('div');
        elem.className = "katex_output_roots";
        document.querySelectorAll('.arr_row')[num].appendChild(elem);
    }
    document.querySelectorAll('.arr_row')[num].querySelector(".katex_output_roots").innerHTML = "";
    
    let str = "";
    for (let j = 0; j < x.length; j++) {
        str += "x_{" + j + "} = " + x[j] + ";\\\\";
    }

    document.querySelectorAll('.arr_row')[num].querySelector(".katex_output_roots").innerHTML = katex.renderToString(str);
}

function fillArray(num) {
    if(num == 0){
        countRow = gcountRow;
    } else {
        countRow = lucountRow;
    }

    for (let i = 0; i < countRow - 1; i++) {
        for (let j = 0; j < countRow - 1; j++) {
            document.querySelectorAll('.arr_row')[num].querySelector('#arr_input' + i + '' + j).value = Math.floor(Math.random() * 20) * Math.pow(-1, Math.round(Math.random()));
        }
        document.querySelectorAll('.arr_row')[num].querySelector('#b_input' + i).value = Math.floor(Math.random() * 20) * Math.pow(-1, Math.round(Math.random()));
    }
    renderToStr(num);
}

function addRow(num) {
    if(num == 0){
        countRow = gcountRow;
    } else {
        countRow = lucountRow;
    }

    document.querySelectorAll('.arr_row')[num].innerHTML = " ";
    for (let j = 0; j < countRow; j++) {
        let row = document.createElement('label');
        row.className = "input" + j;
        let str = '';
        for (let i = 0; i < countRow; i++) {
            let value = Math.floor(Math.random() * 20) * Math.pow(-1, Math.round(Math.random()));
            str += `<input type="number" id="arr_input` + j + "" + i + `" size = "1" value = "` + value + `">` + 
            katex.renderToString("x_{" + i + "}");
            if(i != countRow - 1){
                str += " + ";
            }
        }
        row.innerHTML = str +
            ` = <input type="number" id="b_input` + j + `" size="2" value = "` + Math.floor(Math.random() * 20) * Math.pow(-1, Math.round(Math.random())) + `"><br>`;
            document.querySelectorAll('.arr_row')[num].appendChild(row);
    }

    
    for (let j = 0; j < countRow; j++) {
        for (let i = 0; i < countRow; i++) {
            document.querySelectorAll('.arr_row')[num].querySelector('#arr_input' + i + '' + j).onchange = function() {
            renderToStr(num);
            };
        }
        document.querySelectorAll('.arr_row')[num].querySelector('#b_input' + j).onchange = function() {
            renderToStr(num);
        };
    }

    if(num == 0){
        gcountRow += 1;
    } else {
        lucountRow += 1;
    }
    renderToStr(num);
}

function removeRow(num) {
    if(num == 0){
        countRow = gcountRow;
    } else {
        countRow = lucountRow;
    }

    if (countRow > 2) {
        if(num == 0){
            gcountRow -= 2;
        } else {
            lucountRow -= 2;
        }

        addRow(num);
    }
}

function renderToStr(num) {
    if(num == 0){
        countRow = gcountRow;
    } else {
        countRow = lucountRow;
    }

    if(document.querySelectorAll('.arr_row')[num].querySelector(".katex_output") == null) {
        var elem = document.createElement('div');
        elem.className = "katex_output";
        document.querySelectorAll('.arr_row')[num].appendChild(elem);
    }
    document.querySelectorAll('.arr_row')[num].querySelector(".katex_output").innerHTML = "";
        
    for (let i = 0; i < countRow; i++) {
        let str = "";
        let value;
        for (let j = 0; j < countRow; j++) {
            if(document.querySelectorAll('.arr_row')[num].querySelector('#arr_input' + i + '' + j)?.value != undefined) {
                value = document.querySelectorAll('.arr_row')[num].querySelector('#arr_input' + i + '' + j).value;
                if(value != 0) {
                    if(j != 0) {
                        if(value > 0 && str != "") {
                            str += " + ";
                        }
                    }
                    str += value + "x_{" + j + "} ";
                }
                
            }
        }
        if(document.querySelectorAll('.arr_row')[num].querySelector('#b_input' + i)?.value != undefined) {
            value = document.querySelectorAll('.arr_row')[num].querySelector('#b_input' + i).value;
            if(value != null) {
                str += " = " + value + "\\\\";
            }
        }

        document.querySelectorAll('.arr_row')[num].querySelector(".katex_output").innerHTML += katex.renderToString(str);
    }
}

addRow(0);
addRow(1);