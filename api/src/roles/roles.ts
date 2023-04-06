import users from "../model/users"


export const createRoles = async() => {
    try {
        const countRoles = await users.estimatedDocumentCount()

        if(countRoles > 0 || countRoles === undefined ) return;
        const values = await Promise.all([
            new users({ name: "teacher" }).save(),
            new users({ name: "admin" }).save(),
            new users({ name: "user" }).save()
        ]);
        console.log(values)
    } catch (error) {
        console.error(error)
    } 
}