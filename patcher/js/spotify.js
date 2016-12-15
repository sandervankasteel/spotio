const fs = require('fs');
const exec = require('child_process').exec;

var Spotify = function () {
    this.platform = process.platform;
    this.version = null;
    this._installDir = null;

    this.getVersion = function() {
        if(this.platform == 'darwin') {
            // system
            return "1.4.1234";
        }

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
        if(this._installDir != null) {
            return this._installDir;
        }

        switch (this.platform) {
            case 'linux':
                this._installDir = '/usr/share/spotify';
            case 'darwin':
                try {
                    var that = this; // Because dirty fixes :(
                    exec('osascript -e \'tell application "System Events" to POSIX path of (file of process "Spotify")\'', function(err, stdout, stderr) {
                        if(err) {
                            throw Error;
                        }
                        that._installDir = stdout;       
                    });
                } catch(err) {
                    this._installDir = null;;
                }
            case 'win32':
                this._installDir = 'C:\\';
            default:
                this._installDir = null;
        }

        return this._installDir;
    }
}