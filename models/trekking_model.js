let db =firebase.firestore();

export default {
    create(data) {
    //data in not common JS Object, it needed to be handled before use as data source, this means to do:{...data}
        // now is handled on rows 58 to 62 in ./controllers/cause.js
        return db.collection("trekking").add(data);
    },
    getAll(){
        return db.collection("trekking").get();
    },
    get(id){
        return db.collection("trekking").doc(id).get();
    },
    close(id){
        return db.collection("trekking").doc(id).delete();
    },
    donate(id,data){
        return db.collection("trekking").doc(id).update(data);
    }
};