class AuthData{
    setUser(name){
        localStorage.setItem('name', name)
    }
    setAuthentication(value){
        localStorage.setItem('auth', value)
    }
    returnUsername(){
        return localStorage.getItem('name')
    }
    returnIsAuth(){
        return localStorage.getItem('auth')
    }

    logout(){
        localStorage.removeItem('auth')
        localStorage.removeItem('name')
    }
}

export default new AuthData()