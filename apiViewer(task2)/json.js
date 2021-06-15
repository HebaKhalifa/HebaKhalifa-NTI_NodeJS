const createCustomElement = (parent, element, classes, text) => {
    customElement = document.createElement(element);
    parent.appendChild(customElement);
    if (classes != '') {
        customElement.className = classes
    }
    if (text != '') {
        customElement.textContent = text;
    }
    return customElement
}


const getData = async (callback) => {
    try {
        let x = await fetch('https://api.covid19api.com/summary')
        let y = await (x.json())
        // console.log(y)   
        // return y
        callback(y, false)
    }
    catch (e) {
        callback(false, e)
    }
}

const extractHeaders = (element) => {
    cols = [];
    for (key in element) {
        if (key === "Premium") {
            continue;
        }
        cols.push(key);
    }
    return cols;
}

const displayData=(countries, selector)=>{
    let container = document.querySelector(selector);
    let table = createCustomElement(container, 'table', 'table table-bordered m-3');
    ctreateHeaders(table,countries[0]);
    fillTable(table,countries);
}

const ctreateHeaders = (table,element) => {
    
    let tr = createCustomElement(table, 'tr','');
    let cols = extractHeaders(element);
    for (col in cols) {
        createCustomElement(tr, 'th', 'col p-3', cols[col]);

    }
}

const fillTable = (table,countries) => {
    for (c in countries) {
        let tr = createCustomElement(table, 'tr','');

        console.log( countries[c]['Country']);
        i=0
            for (col in cols) {
            //     let txt='';
            //     if(cols[col]=='Country'){
            //         txt= countries[c][cols[col]];
            //     }
            // createCustomElement(tr, 'td', 'col', txt);
            // console.log([cols[col]]+' => '+countries[c][cols[col]]);
            createCustomElement(tr, 'td', 'col', countries[c][cols[col]]);
            console.log(i)
            i++
        }
    }
}

getData((data) => {
    if (data) {
        let countries = data.Countries;
        // console.log(extractHeaders(countries[0]));
        displayData(countries, '#apiViewer');

    }
});