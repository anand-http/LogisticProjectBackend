const User = require('../model/User');

const fetchRegion = async (req, res) => {

    const employeeId = req.body.username;

    try {

        const employee = await User.findOne({ username: employeeId }).select('region');

        if (!employee) {
            return res.status(404).json({ message: "User`s Region doesn't exist" });
        }

        const region = employee.region
        
        console.log(region);

        res.json({region});


    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }


}

module.exports = { fetchRegion };