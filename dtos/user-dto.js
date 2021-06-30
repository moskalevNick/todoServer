module.exports = class UserDto {
    email;
    id;
    isActivated;
    name;
    city;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.name = model.name;
        this.city = model.city
    }
}
