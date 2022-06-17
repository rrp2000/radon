let axios = require("axios")


let allMemes = async function (req, res) {
    try {
        let options = {
            method: "get",
            url: `https://api.imgflip.com/get_memes`
        }
        let allMeme = await axios(options)
        res.status(200).send({ msg: allMeme.data })
    }
    catch (err) {
        res.send({ msg: err.message })
    }
}
let getTheMeme = async function (req, res) {
    try {
        let template_id = req.query.template_id
        let text0 = req.query.text0
        let text1 = req.query.text1
        // let username = req.params.username
        // let password = req.params.password
        // console.log(template_id,text0,text1)
        let body = req.body
        let options = {
            method: "post",
            // url: `https://api.imgflip.com/caption_image?template_id=181913649&text0=rosan&text1=patel&username=chewie12345&password=meme@123`,
            url: `https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=chewie12345&password=meme@123`,
            data: body
        }
        let allMeme = await axios(options)

        res.status(200).send({ msg: allMeme.data })
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}




module.exports.allMemes = allMemes
module.exports.getTheMeme = getTheMeme