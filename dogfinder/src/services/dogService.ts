const searchDogsDefault = async () => {
    await fetch("https://frontend-take-home-service.fetch.com/dogs/search?sort=breed:asc", {
        credentials: "include"
    })
        .then(response => response.json())
        .then(data => data)
        .catch(err => err)
}

const dogService = { searchDogsDefault };

export default dogService;