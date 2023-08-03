const login = async (name: string, email: string) => {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const emailTest = re.test(email);
    if (name === (undefined || null || "")) {
        return { message: "Please enter your name" }
    } else if (emailTest === false) {
        return { message: "Please enter a valid email" }
    } else {
        await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                name: name,
                email: email
            })
        })
            .then(response => response.json())
            .then(data => data)
            .catch(err => console.log(err))
    }
}

const logout = async () => {
    await fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
        method: "POST"
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
}

const authService = { login, logout };
export default authService;