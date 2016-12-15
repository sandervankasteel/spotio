const fs = require('fs');

var Spotify = function () {
    this.platform = process.platform;

    this.getVersion = function() {
        return "1.0.43.125.g376063c5";
    }

    // Returns if the current version of Spotify is already patched with Spotio ^^
    this.isPatched = function() {
        try {
            fs.accessSync(this._installationDirectory() + '/Apps/spotio');
            return true;    
        } catch (err) {
            return false;
        }
    }


    this.markAsPatched = function() {
        fs.writeFile(this._installationDirectory() + '/Apps/spotio');
    }

    this._installationDirectory = function() {
        switch (this.platform) {
            case 'linux':
                return '/usr/share/spotify';
            case 'darwin':
                return '/Applications/Spotify.app/Contents/Resources';
            default:
                return 'C:\\';
        }
    }
}