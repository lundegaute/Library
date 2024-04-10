
async function addToReadBooks(bookId) {
    console.log(bookId)
    axios.post("/readBooks", { bookId }).then( (res) => {
        if ( res.data.data.StatusCode !== 200) {
            alert("Book already in list")
        } else {
            window.location.reload();
        }
    })


}
    

