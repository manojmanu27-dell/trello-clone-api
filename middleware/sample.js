module.exports = async (req, res) => {
    try {
        console.log("the sample response",req)
    } catch (error) {
        return res.status(500).json({
            errorCode: "LO01",
            errorMsg: error.error.errorMsg
        })
    }
}
