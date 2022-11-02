export default class UserInfo {
    constructor({nameSelector, jobSelector, picSelector}) {
        this._profileName = document.querySelector(nameSelector);
        this._profileJob = document.querySelector(jobSelector);
        this._profilePic = document.querySelector(picSelector);
    }
    getUserInfo() {
        this._info = {
            name: this._profileName.textContent,
            about: this._profileJob.textContent,
        }
        return this._info;    
    }
    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileJob.textContent = data.about;
    }
    setUserPic(data) {
        this._profilePic.src = data.avatar;
    }
    setUserId(data) {
        this._id = data._id
    }
    getUserId() {
        return this._id
    }
}