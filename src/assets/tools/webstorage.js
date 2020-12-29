export const localStorage = {
    setLocal: (key, data) => {
        let dataStr = JSON.stringify(data)
        window.localStorage.setItem(key, dataStr)
    },
    getLocal: (key) => {
        let dataStr = window.localStorage.getItem(key)
        if (!dataStr) return false
        try {
            return JSON.parse(dataStr)
        } catch (e) {
            return false
        }
    },
    removeLocal: (key) => {
        window.localStorage.removeItem(key)
    }
}

export const sessionStorage = {
    setSession: (key, data) => {
        let dataStr = JSON.stringify(data)
        if (!dataStr) return false
        try {
            return JSON.parse(dataStr)
        } catch (e) {
            console.log(e, dataStr)
            return false
        }
    },
    getSession: (key) => {
        let dataStr = window.sessionStorage.getItem(key)
        return dataStr ? JSON.parse(dataStr) : null
    },
    removeSession: (key) => {
        window.sessionStorage.removeItem(key)
    }
}