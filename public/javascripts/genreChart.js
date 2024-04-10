
document.addEventListener("DOMContentLoaded", function() {
    const genrePieChart = document.getElementById("genrePieChart").getContext("2d");
    let fantasy = 0;
    let scifi = 0;
    axios.get("/readBooks/onlyBooks").then( (res) => {
        let readBooks = res.data.data.Results;

        readBooks.forEach( (book) => {
            if ( book.Genre === "Fantasy") {
                fantasy += 1;
            } else {
                scifi += 1;
            }
        })
    
        const genresData = {
            labels: ['Sci-Fi', 'Fantasy'],
            datasets: [{
                data: [scifi, fantasy],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.5)', // Blue
                    'rgba(75, 192, 192, 0.5)', // Green
                    
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1
            }]
        };
        
        
        let myChart = new Chart(genrePieChart, {
            type: "pie",
            data: genresData,
            options: {
                // Any options, add here
            }
        })
        
    })    
    
})
    

