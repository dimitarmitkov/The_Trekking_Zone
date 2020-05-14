import extend from "../utils/context.js"
import models from "../models/index_model.js";
import docModifier from "../utils/doc_modifier.js";

export default {
    get: {
        dashboard(context) {

            models.trekking.getAll().then((response) => {
                //response.docs is array of "docs" that contains all data loaded on firebase server
                // console.log(response.docs);
                //below, spread all data from response.docs (comes form firebase) and take all cause data including id (form firebase)
                const trekking = response.docs.map(docModifier);
                // docModifier replaces => return {...d.data(), id: d.id}


                //below, spreads causes into cause.hbs as cause data
                context.trekking = trekking;

                context.canTrekking = trekking.filter(t=> t.uid === localStorage.getItem("userId"));

                // console.log(context.canTrekking);


                extend(context).then(function () {
                    this.partial("./views/trekking/dashboard.hbs")
                })
            });

        },
        create(context) {
            extend(context).then(function () {
                this.partial("./views/trekking/create_trekking.hbs")

            })
        },
        details(context) {
            const {trekId} = context.params;
            models.trekking.get(trekId).then((response) => {
                // console.log(response.data());

                const trekking = docModifier(response);
                // console.log(cause);


                //below, spreads causes into cause.hbs as cause data => this is version with "cause.cause" case
                // context.cause = cause;

                context.trekking = trekking;
                // console.log("trekking",context.trekking.dateTime);

                // //other version just with cause version:
                // Object.keys(trekking).forEach(key => {
                //     context[key] = trekking[key];
                // });
                //
                // //canDonate - variable for donations
                // //uid - cause creator
                // //expression below - current user is not cause creator
                // context.canDonate = trek.uid !== localStorage.getItem("userId");
                // console.log(context);

                //below check if user is logged-in  + set header and footer
                extend(context).then(function () {
                    this.partial("./views/trekking/large_trekking.hbs")
                })

            }).catch(e => console.error(e));
        },
        edit(context){
            // other version
            // console.log(context);
            // const {trekId} = context.params;
            // models.trekking.get(trekId).then((response) => {
            //     const trekking = docModifier(response);
                extend(context).then(function () {
                    this.partial("./views/trekking/edit_trekking.hbs")
                })
            // })
        }


    },
    post: {
        create(context) {

            //below, gives data which user is created this cause
            const data = {
                ...context.params,
                uid: localStorage.getItem("userId"),
                likes: 0,
        // optioal:
        //         //date,
        //         //likes:,
        //         donors: [],
            };

            models.trekking.create(data).then((response) => {
                // console.log(response);
                context.redirect("#/trekking/dashboard");//trekking/dashboard
            }).catch((e) => console.error(e));

            //context is Object, but it is Sammy Object, not common JS Object
            //params is also not common JS Object, it is "kind of" Sammy Object
        }

        //data from firefox:
        // dateTime: "date"
        // description: "description"
        // imageURL: "imageURL"
        // location: "location"
    },
    del: {
        close(context) {
            let {trekId} = context.params;

            // console.log(trekId);
            // console.log(context);
            models.trekking.close(trekId).then((response) => {
                context.redirect("#/trekking/dashboard");
            })
        }
    },
    put: {
        donate(context) {
            const {trekId} = context.params;
            console.log(trekId);
            // optional:
            // console.log(donateAmount);
            // models.trekking.get(trekId).then((response) => {
            //     const cause = docModifier(response);
            //     cause.collectedFunds += Number(donateAmount);
            //     cause.donors.push(localStorage.getItem("userEmail"));
            //     return models.cause.donate(causeId, cause)
            // }).then((response) => {
            //     context.redirect("#/cause/dashboard");
            // })
        }
    }
};