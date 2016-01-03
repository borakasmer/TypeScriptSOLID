//Open / Closed Principle
interface ILogger {
    WriteLog(): string;
}

class XmlLog implements ILogger {
    public WriteLog(): string {
        return "Xml Log Written! " + new Date().toLocaleString()
    }
}

class MsSqlLog implements ILogger {
    public WriteLog(): string {
        return "MsSql Log Written! " + new Date().toLocaleString()
    }
}

class MongoDbLog implements ILogger {
    public WriteLog(): string {
        return "MongoDb Log Written! " + new Date().toLocaleString()
    }
}

class XboxLiveLog implements ILogger {
    gamerTag: string;
    constructor(GamerTag: string) {
        this.gamerTag = GamerTag;
    }
    public WriteLog(): string {
        return "XboxLive Log Written! for " + this.gamerTag + " " + new Date().toLocaleString()
    }
}

class LogProcess {
    logProcess: ILogger;
    constructor(logPrc: ILogger) {
        this.logProcess = logPrc;
    }
    public LogUser(): string {
        return this.logProcess.WriteLog();
    }
}

var log1: LogProcess;
log1 = new LogProcess(new MsSqlLog());
alert(log1.LogUser());

var log2: LogProcess;
log2 = new LogProcess(new XmlLog());
alert(log2.LogUser());

var log3: LogProcess;
log3 = new LogProcess(new MongoDbLog());
alert(log3.LogUser());

//var logLive: LogProcess;
//logLive = new LogProcess(new XboxLiveLog('Bora'));
//alert(logLive.LogUser());

//Single Responsibility Principle
enum UserTypes {
    Mobile = 0,
    Console = 1,
    Tablet = 2
}

interface IUser {
    GamerTag: string;
    LiveID: number;
    UserType: UserTypes;
}

function CreateUser<u extends User>(user: { new (): u; }, GamerTag: string, LiveID: number, UserType: UserTypes, IsGoldMemeber: boolean): u {
    var newUser: u;
    newUser = new user();
    newUser.GamerTag = GamerTag;
    newUser.LiveID = LiveID;
    newUser.IsGoldMemeber = IsGoldMemeber;
    newUser.UserType = UserType;
    return newUser;
}

class CheckLicense {
    CheckGameLicense<L extends IGameLicense>(Licenses: L[], UserLicenseID: number, LiveID: number): boolean {
        return (Licenses.filter(d=> d.LicenseID == UserLicenseID && d.LiveID == LiveID).length) > 0 ? true : false;
    }
}

class Verify {
    user: User;
    game: Game;
    greet: Greet;
    checkLicense: CheckLicense;
    constructor(usr: User, gm: Game) {
        this.user = usr;
        this.game = gm;
        this.greet = new Greet(this.user.UserType, this.game.Name, this.user.GamerTag);
    }
    CanJoin() {
        this.checkLicense = new CheckLicense();
        if (this.user.IsGoldMemeber && this.checkLicense.CheckGameLicense(GameUserLicenses(), this.game.LicenseID, this.user.LiveID)) {
            if (this.user.UserType == UserTypes.Console) { 
                var logLive: LogProcess;               
                logLive = new LogProcess(new XboxLiveLog(this.user.GamerTag));
                alert(logLive.LogUser());
            }
            return "Wellcome to " + this.greet.Greeting();
        }
        else {
            return "You are not Access " + this.game.Name;
        }
    }
}

class Greet {
    private userType: UserTypes;
    private userName: string;
    private gameName: string;
    constructor(usrTyp: UserTypes, gmName: string, userName: string) {
        this.userType = usrTyp;
        this.gameName = gmName;
        this.userName = userName;
    }
    Greeting() {
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
    }
}

function GameUserLicenses() {
    var listOfGameUser = [{ LicenseID: 123457, LiveID: 32147423 }, { LicenseID: 345632, LiveID: 67432466 }, { LicenseID: 1111, LiveID: 8244444 }];
    return listOfGameUser;
}

class Game {
    Name: string;
    LicenseID: number;
}

class User implements IUser {
    GamerTag: string;
    LiveID: number;
    UserType: UserTypes;
    IsGoldMemeber: boolean;
}

interface IGameLicense {
    LicenseID: number;
    LiveID: number;
}


var usr: User;

usr = CreateUser(User, "CoderBora", 32147423, UserTypes.Console, true);
var game = new Game();
game.LicenseID = 123457;
game.Name = "Tomb Raider";
var verify = new Verify(usr, game);
alert(verify.CanJoin());

//---------------------------------------------------------
