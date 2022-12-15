function UseStorage(key, value) {
    const jsonJobs = JSON.stringify(value)
    localStorage.setItem(key, jsonJobs)

    return value
}

export default UseStorage;