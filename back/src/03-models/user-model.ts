class UserModel {
    public userId: string;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public role: string;


    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;

    }
}

export default UserModel;