// Variables
    let ads = [
        ['Arnuld buen.gif', ''],
        ['Arnuld asco.gif', ''],
    ]

// Contents
    // Loading Ads
        console.group('Loading the fake in page ads');
        let advertSlots = document.getElementsByClassName('advert');

        let unusedAds = ads;
        for (i = 0; i < advertSlots.length; i++) {
            // select & display the ad
            let selectedAd = Math.floor(Math.random() * unusedAds.length);
            advertSlots[i].style.backgroundImage = 'url("../../images/Ads/' + unusedAds[selectedAd][0] + '")';
            console.log('Assigned [' + unusedAds[selectedAd][0] + '] to ad slot ' + (i + 1));

            // update the list of ads
            unusedAds.splice(selectedAd, 1);
            console.log(unusedAds.length + ' unused ' + (unusedAds.length == 1 ? 'ad' : 'ads') + ' remaining');
        };
        console.groupEnd();
    
    // Loading accounts
        console.group('Loading user data');
        if (saveData.getItem('username') == null) {
            saveData.setItem('username', 'Guest');
        };
        let username = saveData.getItem('username');
        console.log('Username: ' + username);

        console.groupEnd();

// Functions