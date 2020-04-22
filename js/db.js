// obeTbmW1e8xjk5Wt9qLc
// offline data

const cdid = 'obeTbmW1e8xjk5Wt9qLc'; // coffee dispenser id

db.enablePersistence()
    .catch(err => {
        if (err.code == 'failed-precondition') {
            // probably multiple tabs open at once
            console.log('persistence failed');
        } else if (err.code == 'unimplemented') {
            // lack of browser support
            console.log('persistence is not available');
        } 
    });


//realtime listener
db.collection('coffee-dispenser').onSnapshot(snapshot => {
    //console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        //console.log(change, change.doc.data(), change.doc.id);
        if (change.type === 'added' || change.type === 'modified') {
            // add or modified
            renderStatus(change.doc.data())
        }
        if (change.type === 'removed') {
            // remove 
        }
    });
});


/*
// add new recipe TODO löschen

const recipeForm = document.querySelector('.add-recipe');
recipeForm.addEventListener('submit', evt => {
    // prevent from refresh the page
    evt.preventDefault();

    const recipe = {
        title: recipeForm.title.value,
        ingredients: recipeForm.ingredients.value
    };

    db.collection('recipes').add(recipe)
        .catch(err => console.log(err));

    recipeForm.title.value = '';
    recipeForm.ingredients.value = '';
})

// delete a recipe TODO Löschen
const recipeContainer = document.querySelector('.recipes');
recipeContainer.addEventListener('click', evt => {
    // console.log(evt);
    if (evt.target.className.indexOf('delete-recipe-btn') > -1) {
        // console.log('clicked delete recipe');
        const id = evt.target.getAttribute('data-id');
        db.collection('recipes').doc(id).delete()
    }
});
*/

// send info to server
function statusWork(works){
	// generate timestamp
	let ts = 1
	
	db.collection('coffee-dispenser').doc(cdid).set(
	{
		coffee : works,
		timestamp : ts
	}).then( () => {
		console.log("db document succesful written");
	}).catch( err => {
		console.log("db write error:" + err)
	})
}
		
		/*
        db.collection('coffee-dispenser').doc(cdid).set({
			key : value
			
			
		})
		.then( () => {
			console.log("db document succesful written");
		})
		.catch( err => {
			console.log(err)
		})*/

