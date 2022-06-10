
const global = (
    function (req, res, next) {
        const route = (req.route.path)
        console.log(route)

        next();
  }
)

module.exports.global = global


