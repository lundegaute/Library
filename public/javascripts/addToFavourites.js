
async function addOrRemoveToFavourites(bookId) {
    console.log(bookId)

    axios.post("/favouriteBooks", { bookId: bookId }).then( (res) => {
        if ( res.data.data.StatusCode !== 200 ) {
            alert(res.data.data.Results)
        } else {
            window.location.reload();                     
        } 
    })
}


