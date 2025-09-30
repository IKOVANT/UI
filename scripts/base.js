// Variables
    let saveData = window.localStorage;

// Contents
    document.querySelectorAll("input[type=checkbox]").forEach(checkbox => {
        let checkboxHolder = document.createElement('div');
        checkboxHolder.classList = 'checkboxHolder ' + checkbox.classList;
            let checkboxInner = document.createElement('div');
            checkboxInner.classList = 'inner';
            checkboxInner.innerText = '✔';
        checkboxHolder.appendChild(checkboxInner);
        checkbox.replaceWith(checkboxHolder);
        checkboxHolder.appendChild(checkbox);
    });

// Functions