// Variables
    let bloomInterval;
    let bloomDefaults = {
        'active': true,
        'strength': 33,
    };

// Contents
    document.getElementById('BloomUI').innerHTML = document.getElementById('MainUI').innerHTML;

    if (window.localStorage.getItem('bloomActive') == null || window.localStorage.getItem('bloomStrength') == null) {
        setBloomDefaults();
    } else {
        document.getElementById('bloomCheckbox').checked = (window.localStorage.getItem('bloomActive') == 'true');
        document.getElementById('bloomSlider').value = parseInt(window.localStorage.getItem('bloomStrength'));
        updateBloomStrength(document.getElementById('bloomSlider').value);
        updateBloomEvents(document.getElementById('bloomCheckbox').checked);
    };

// Functions
    function setBloomDefaults () {
        window.localStorage.setItem('bloomActive', bloomDefaults.active);
        window.localStorage.setItem('bloomStrength', bloomDefaults.strength);
        document.getElementById('bloomCheckbox').checked = bloomDefaults.active;
        document.getElementById('bloomSlider').value = bloomDefaults.strength;
        updateBloomStrength(bloomDefaults.strength);
        updateBloomEvents(bloomDefaults.active);
    };

    function setBloomActive (value) {
        window.localStorage.setItem('bloomActive', value);

        console.log(value);

        updateBloomEvents(value);
    };
    
    function updateBloomEvents (value) {
        let MainUIInputs = document.getElementById('MainUI').querySelectorAll('input, button');
        let BloomUIInputs = document.getElementById('BloomUI').querySelectorAll('input, button');

        let MainUIScrollables = document.getElementById('MainUI').querySelectorAll('div');
        let BloomUIScrollables = document.getElementById('BloomUI').querySelectorAll('div');

        document.getElementById('BloomUI').style.visibility = value ? 'visible' : 'hidden';

        if (value) {
            for (let i = 0; i < MainUIInputs.length; i++) {
                // Makes the bloom match what's on screen
                if (MainUIInputs[i].type == 'checkbox') {
                    BloomUIInputs[i].checked = MainUIInputs[i].checked;
                } else {
                    BloomUIInputs[i].value = MainUIInputs[i].value;
                };

                // Adds events to make the bloom keep matching what's on screen
                if (MainUIInputs[i].type == 'range') {
                    MainUIInputs[i].addEventListener('input', updateBloomForMostInputs, false);
                    MainUIInputs[i].MainUIInput = MainUIInputs[i];
                    MainUIInputs[i].BloomUIInput = BloomUIInputs[i];
                } else if (MainUIInputs[i].type == 'checkbox') {
                    MainUIInputs[i].addEventListener('change', updateBloomForCheckboxes, false);
                    MainUIInputs[i].MainUIInput = MainUIInputs[i];
                    MainUIInputs[i].BloomUIInput = BloomUIInputs[i];
                    
                } else {
                    MainUIInputs[i].addEventListener('change', updateBloomForMostInputs, false);
                    MainUIInputs[i].MainUIInput = MainUIInputs[i];
                    MainUIInputs[i].BloomUIInput = BloomUIInputs[i];
                };
            };
            for (let i = 0; i < MainUIScrollables.length; i++) {
                // Makes the bloom match what's on screen
                BloomUIScrollables[i].scrollTop = MainUIScrollables[i].scrollTop;

                // Adds events to make the bloom keep matching what's on screen
                MainUIScrollables[i].addEventListener('scroll', updateBloomForScrollables, false);
                MainUIScrollables[i].MainUIScrollable = MainUIScrollables[i];
                MainUIScrollables[i].BloomUIScrollable = BloomUIScrollables[i];
            };
        } else {
            MainUIInputs.forEach(element => {
                if (element.type == 'range') {
                    element.removeEventListener('input', updateBloomForMostInputs);
                } else if (element.type == 'checkbox') {
                    element.removeEventListener('change', updateBloomForCheckboxes);
                } else {
                    element.removeEventListener('change', updateBloomForMostInputs);
                };
            });
        };
    };
    function setBloomStrength (value) {
        window.localStorage.setItem('bloomStrength', value);

        updateBloomStrength(value);
    };
    function updateBloomStrength (value) {
        document.getElementById('BloomUI').style.opacity = value/100;
    };

    function updateBloomForMostInputs (event) {
        event.currentTarget.BloomUIInput.value = event.currentTarget.MainUIInput.value;
    };
    function updateBloomForCheckboxes (event) {
        event.currentTarget.BloomUIInput.checked = event.currentTarget.MainUIInput.checked;
    };
    function updateBloomForScrollables (event) {
        event.currentTarget.BloomUIScrollable.scrollTop = event.currentTarget.MainUIScrollable.scrollTop;
    };

    function updateBloom () {
        document.getElementById('BloomUI').innerHTML = document.getElementById('MainUI').innerHTML;
    };