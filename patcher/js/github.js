var Github = function () {
    this._buildEndPointURL();

    // Full github username + repo name
    // So for example : devinhalladay/spotio
    this._repo = 'devinhalladay/spotio'; 

    this._buildEndPointURL = function() {  
        this._url = 'https://api.github.com/';
    }

    this.getAllReleases = function() {
        return [];
    }
}