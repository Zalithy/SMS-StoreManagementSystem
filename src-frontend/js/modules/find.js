export function findNameByID(data, id) {
    const result = data.find(item => item.id == id);
    return result ? result.name : null;  // Return the id if found, otherwise return null
}

export function findIdByName(data, name) {
    const result = data.find(item => item.name == name);
    return result ? result.id : null;  // Return the id if found, otherwise return null
}