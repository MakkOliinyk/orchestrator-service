const axios = require("axios");
const createPath = require("../paths");

const getFullPath = createPath('IDENTITY');

module.exports = async (req, res, next) => {
    const { headers } = req;

    try {
        const response = await axios({
            method: 'get',
            url: getFullPath('/me'),
            headers: {
                Authorization: headers.authorization,
            }
        });

        req.user = response.data.user;
        next();
    } catch (error) {
        res.send(error);
    }
};
