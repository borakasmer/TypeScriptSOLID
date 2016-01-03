var XmlLog = (function () {
    function XmlLog() {
    }
    XmlLog.prototype.WriteLog = function () {
        return "Xml Log Written! " + new Date().toLocaleString();
    };
    return XmlLog;
})();
var MsSqlLog = (function () {
    function MsSqlLog() {
    }
    MsSqlLog.prototype.WriteLog = function () {
        return "MsSql Log Written! " + new Date().toLocaleString();
    };
    return MsSqlLog;
})();
var MongoDbLog = (function () {
    function MongoDbLog() {
    }
    MongoDbLog.prototype.WriteLog = function () {
        return "MongoDb Log Written! " + new Date().toLocaleString();
    };
    return MongoDbLog;
})();
var XboxLiveLog = (function () {
    function XboxLiveLog(GamerTag) {
        this.gamerTag = GamerTag;
    }
    XboxLiveLog.prototype.WriteLog = function () {
        return "XboxLive Log Written! for " + this.gamerTag + " " + new Date().toLocaleString();
    };
    return XboxLiveLog;
})();
var LogProcess = (function () {
    function LogProcess(logPrc) {
        this.logProcess = logPrc;
    }
    LogProcess.prototype.LogUser = function () {
        return this.logProcess.WriteLog();
    };
    return LogProcess;
})();
var log1;
log1 = new LogProcess(new MsSqlLog());
alert(log1.LogUser());
var log2;
log2 = new LogProcess(new XmlLog());
alert(log2.LogUser());
var log3;
log3 = new LogProcess(new MongoDbLog());
alert(log3.LogUser());
//var logLive: LogProcess;
//logLive = new LogProcess(new XboxLiveLog('Bora'));
//alert(logLive.LogUser());
//Single Responsibility Principle
var UserTypes;
(function (UserTypes) {
    UserTypes[UserTypes["Mobile"] = 0] = "Mobile";
    UserTypes[UserTypes["Console"] = 1] = "Console";
    UserTypes[UserTypes["Tablet"] = 2] = "Tablet";
})(UserTypes || (UserTypes = {}));
function CreateUser(user, GamerTag, LiveID, UserType, IsGoldMemeber) {
    var newUser;
    newUser = new user();
    newUser.GamerTag = GamerTag;
    newUser.LiveID = LiveID;
    newUser.IsGoldMemeber = IsGoldMemeber;
    newUser.UserType = UserType;
    return newUser;
}
var CheckLicense = (function () {
    function CheckLicense() {
    }
    CheckLicense.prototype.CheckGameLicense = function (Licenses, UserLicenseID, LiveID) {
        return (Licenses.filter(function (d) { return d.LicenseID == UserLicenseID && d.LiveID == LiveID; }).length) > 0 ? true : false;
    };
    return CheckLicense;
})();
var Verify = (function () {
    function Verify(usr, gm) {
        this.user = usr;
        this.game = gm;
        this.greet = new Greet(this.user.UserType, this.game.Name, this.user.GamerTag);
    }
    Verify.prototype.CanJoin = function () {
        this.checkLicense = new CheckLicense();
        if (this.user.IsGoldMemeber && this.checkLicense.CheckGameLicense(GameUserLicenses(), this.game.LicenseID, this.user.LiveID)) {
            if (this.user.UserType == UserTypes.Console) {
                var logLive;
                logLive = new LogProcess(new XboxLiveLog(this.user.GamerTag));
                alert(logLive.LogUser());
            }
            return "Wellcome to " + this.greet.Greeting();
        }
        else {
            return "You are not Access " + this.game.Name;
        }
    };
    return Verify;
})();
var Greet = (function () {
    function Greet(usrTyp, gmName, userName) {
        this.userType = usrTyp;
        this.gameName = gmName;
        this.userName = userName;
    }
    Greet.prototype.Greeting = function () {
        switch (this.userType) {
            case UserTypes.Mobile:
                {
                    return this.gameName + ": Mobile User " + this.userName;
                    break;
                }
            case UserTypes.Tablet:
                {
                    return this.gameName + ": Tablet User " + this.userName;
                    break;
                }
            case UserTypes.Console:
                {
                    return this.gameName + ": Console User " + this.userName;
                    break;
                }
        }
    };
    return Greet;
})();
function GameUserLicenses() {
    var listOfGameUser = [{ LicenseID: 123457, LiveID: 32147423 }, { LicenseID: 345632, LiveID: 67432466 }, { LicenseID: 1111, LiveID: 8244444 }];
    return listOfGameUser;
}
var Game = (function () {
    function Game() {
    }
    return Game;
})();
var User = (function () {
    function User() {
    }
    return User;
})();
var usr;
usr = CreateUser(User, "CoderBora", 32147423, UserTypes.Console, true);
var game = new Game();
game.LicenseID = 123457;
game.Name = "Tomb Raider";
var verify = new Verify(usr, game);
alert(verify.CanJoin());
//---------------------------------------------------------
