export const fetchData = (data) => {
    return new Promise((resolve, reject) => {
        if (data.length > 0) {
            setTimeout(() => {
                resolve(data)
            }, 1000);
        } else {
            reject(new Error("There is no data"))
        }
    })
}

export const fetchItem = (p) => {
    return new Promise((resolve, reject) => {
        if (p) {
            setTimeout(() => {
                resolve(p);
            }, 1000);
        } else {
            reject(new Error("There is no data."))
        }
    });
}