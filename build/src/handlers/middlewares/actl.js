"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const accessControl = (action, access) => {
    return (req, res, next) => {
        try {
            let user = req.user;
            let acls = user === null || user === void 0 ? void 0 : user.acls;
            if (!acls)
                acls = {
                    can_read: true,
                };
            if (acls && acls[action] == true)
                return next();
            console.log(req.user);
            console.log(acls);
            return res.status(403).json({
                message: types_1.errorEnums.PROFILE,
            });
        }
        catch (err) {
            res.status(500).json({
                message: types_1.errorEnums.SERVER,
            });
        }
    };
};
exports.default = accessControl;
