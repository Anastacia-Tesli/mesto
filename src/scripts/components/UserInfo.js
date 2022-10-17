export default class UserInfo {
    constructor({nameSelector, jobSelector}) {
        this._profileName = document.querySelector(nameSelector);
        this._profileJob = document.querySelector(jobSelector);
        
    }
    getUserInfo() {
        this._info = {
            user: this._profileName.textContent,
            job: this._profileJob.textContent
        }
        return this._info;    
    }
    setUserInfo(formData) {
        this._profileName.textContent = formData.user;
        this._profileJob.textContent = formData.job;
    }
}