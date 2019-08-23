const { CONFIG } = require('../../../../common/config');
const { getTestImagePath } = require('../../../utils');
const {
  getImageMetaData,
  resizeAndSaveImage,
} = require('../../../../common/services/imageService');

const { expect } = require('chai');

const fakeImageObject = {
  id: '1',
  path: getTestImagePath(),
};

describe('imageService', () => {
  describe('Retrieves an image by ID and returns the correct structure', () => {
    it('Resize image', async () => {
      const result = await resizeAndSaveImage(fakeImageObject);
      const dimensions = await getImageMetaData(
        `${CONFIG.PERMANENT_LOCATION}/${fakeImageObject.id}.png`
      );
      expect(dimensions.height).to.eq(100, 'height should be 100');
      expect(dimensions.width).to.eq(100, 'width should be 100');
    });
  });
});
