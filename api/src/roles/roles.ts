import roles from "../model/roles"


export const createRoles = async() => {
    try {
        const countRoles = await roles.estimatedDocumentCount()

        if(countRoles > 0 || countRoles === undefined ) return;
        const values = await Promise.all([
            new roles({ name: "creator" }).save(),
            new roles({ name: "admin" }).save(),
            new roles({ name: "user" }).save()
        ]);
        console.log(values)
    } catch (error) {
        console.error(error)
    } 
}