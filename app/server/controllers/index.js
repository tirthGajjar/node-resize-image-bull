function root(req, res) {
  return res.status(200).json({ message: "ok" })
}

function getImageById(req, res) {
  return res.status(200).json({ message: "ok" })
}

function saveImage(req, res) {
  return res.status(200).json({ message: "ok" })
}

module.exports = {
  root,
  getImageById,
  saveImage
}