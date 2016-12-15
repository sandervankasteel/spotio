const fs = require('fs');
const child_process = require('child_process');

var Spotify = function () {
    this._platform = process.platform;
    this._version = null;
    this._installDir = null;

    this.getVersion = function() {
        if(this._version != null) {
            return this._version;
        } 

        switch(this._platform) {
            case 'darwin':
                // get version of application "Spotify"
                this._version = child_process.execSync('osascript -e \'get version of application "Spotify"\'').toString().trim();
                break;
            case 'linux':
                this._version = "1.0.43.125.g376063c5"; // This is my current Linux version
                break;
            default:
                this._version = null;  
        }
        return this._version;
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
        if(this._installDir != null) {
            return this._installDir;
        }

        switch (this._platform) {
            case 'linux':
                this._installDir = '/usr/share/spotify';
                break;
            case 'darwin':
                this._installDir = child_process.execSync('osascript -e \'tell application "System Events" to POSIX path of (file of process "Spotify")\'').toString().trim(); // Because OS X is nasty sometimes :(
                break;
            case 'win32':
                this._installDir = 'C:\\';
                break;
            default:
                this._installDir = null;
                break;
        }

        return this._installDir;
    }
}