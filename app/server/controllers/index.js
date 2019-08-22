const imageModel = require('../models/image');

function root(req, res) {
  return res.status(200).json({ message: 'ok' });
}

async function getImageById(req, res) {
  const { id } = req.params;
  let result;
  let status = 200;

  try {
    if (!id) {
      throw new Error('id is required');
    }
    result = await imageModel.getImageById(id);
  } catch (e) {
    status = 500;
    result = {
      message: e.message,
    };
  }

  return res.status(status).json({ ...result });
}

async function saveImage(req, res) {
  let status = 200;
  let result;

  try {
    if (!req.file) {
      throw new Error('No file provided');
    }
    result = await imageModel.saveImage(req.file);
  } catch (e) {
    status = 500;
    result = {
      message: e.message,
    };
  }

  return res.status(status).json({ ...result });
}

module.exports = {
  root,
  getImageById,
  saveImage,
};
