const Profile = require("../Models/Profile");

exports.getProfile = async (req, res) => {
    try {
        const profile = await req.user.getProfile();
        if (!profile) {
            return res.status(404).json({
                error: "Profile not found",
            });
        }
        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

function calculateAge(dateString) {
    const birthDate = new Date(dateString);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Check if the birthday has occurred this year
    if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
            currentDate.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
}

exports.createProfile = async (req, res) => {
    const { firstName, lastName, bio, DateOfBirth } = req.body;
    try {
        console.log(req.user);
        if (req.user.Profile) {
            return res.status(400).json({
                error: "Profile already exists",
            });
        } else {
            
            const age = calculateAge(DateOfBirth);
            
            const profile = await req.user.createProfile({
                firstName,
                lastName,
                age,
                bio,
            });
            res.json(profile);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

exports.updateProfile = async (req, res) => {
    const { firstName, lastName, age, bio } = req.body;
    try {
        const profile = await req.user.getProfile();
        if (!profile) {
            return res.status(404).json({
                error: "Profile not found",
            });
        }

        if (firstName) profile.firstName = firstName;
        if (lastName) profile.lastName = lastName;
        if (age) profile.age = age;
        if (bio) profile.bio = bio;

        await profile.save();
        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

exports.getProfileByUserId = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            where: {
                userId: req.params.userId,
            },
        });
        if (!profile) {
            return res.status(404).json({
                error: "Profile not found",
            });
        }
        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
};
