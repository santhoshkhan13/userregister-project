const User = require("../model/authModel")

exports.signup = async (req, res) => {
    try {
        console.log("Signup API running");
        if (req.body.password.length >= 8) {
            if (req.body.password === req.body.confirmPassword) {
                const newUser = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    password: req.body.password,
                    confirmPassword: req.body.confirmPassword
                })

                res.status(200).json({
                    status: "success",
                    data: {
                        newUser: newUser
                    }
                })
            } else {
                res.status(401).json({
                    status: "fail",
                    data: {
                        message: "Password and confirm passsword don't match"
                    }
                })
            }
        } else {
            res.status(201).json({
                status: "fail",
                data: {
                    message: "Password length must be greate than 8"
                }
            })
        }
    } catch (error) {
        res.status(401).json({
            status: "fail",
            data: {
                message: error
            }
        })
    }
}

exports.login =async (req, res)=>{
    const {email, password} = req.body;

    if (!email || !password) {
        res.send(400).json({
            message:"Unable to verify the mail and password"
        })
    } 

    try {
        const user = await User.findOne({email}).select('+password')

        if (!user || !password) {
            res.status(401).json({
                status:"Success",
                message:"Incorrect email or password"
            })
        } else {
            res.status(200).json({
                status:"success",
                user
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message:"Internal server error"
        })
    }
}