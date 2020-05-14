import controllers from "../controllers/index.js";

let app = Sammy("#root", function () {

    this.use("Handlebars", "hbs");
    //Home
    this.get("#/", controllers.home.get.home);

    //Users
    this.get("#/user/login", controllers.user.get.login);
    this.get("#/user/register", controllers.user.get.register);

    this.post("#/user/login", controllers.user.post.login);
    this.post("#/user/register", controllers.user.post.register);
    this.get("#/user/logout", controllers.user.get.logout);
    this.get("#/user/show", controllers.user.get.show);
    this.get("#/trekking/dashboard", controllers.trekking.get.dashboard);

    //Trekking
    this.get("#/trekking/create_trekking", controllers.trekking.get.create);
    this.post("#/trekking/create_trekking", controllers.trekking.post.create);
    this.get("#/trekking/details/:trekId", controllers.trekking.get.details);
    this.get("#/trekking/close/:trekId", controllers.trekking.del.close);
    this.get("trekking/edit/:trekId", controllers.trekking.put.edit);
});

app.run("#/");