import {roles} from "../helpers/roles.js";

const grantAccess = (action, resource) =>{
    return async(req, res, next) =>{
        const permission = roles.can(req.payload.role)[action](resource);

        if(!permission.granted){
            return res.status(403).send("You don't have permission.");
        }

        next();
    }
}

export default grantAccess;