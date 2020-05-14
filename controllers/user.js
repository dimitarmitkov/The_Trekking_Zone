import extend from "../utils/context.js"
import models from "../models/index_model.js"

export default {

    get: {
        login(context) {
            extend(context).then(function () {
                this.partial("./views/user/login.hbs");
            })
        },
        register(context) {
            //***
            extend(context).then(function () {
                this.partial("./views/user/register.hbs");
            })
        },
        logout(context) {
            models.user.logout().then((response) => {
                context.redirect("#/");
            })
        },
        show(context) {
            extend(context).then(function () {
                this.partial("./views/user/user.hbs");
            })
        },
        trekking(context){
            extend(context).then(function () {
                this.partial("./views/trekking/dashboard.hbs");
            })
        },

    },
    post: {
        login(context) {
            const {username, password} = context.params;

            models.user.login(username, password)
                .then((response) => {
                    //connection between user.js data and header.hbs variables and if/else check for login
                    context.user = response;
                    context.username = response.email;
                    context.isLoggedIn = true;
                    context.redirect("#/trekking/dashboard");
                })
                .catch((e) => console.error(e))
        },
        register(context) {
            const {username, password, rePassword} = context.params;
            //these username and password comes form register.hbs and they are name fields in <input>
            if (password !== rePassword) {
                alert("Password doesn't match, please retry")
            } else {
                models.user.register(username, password)
                    .then((response) => {
                        context.redirect("#user/login");
                    })
                    .catch((e) => console.error(e))
            }
        }
    }
};