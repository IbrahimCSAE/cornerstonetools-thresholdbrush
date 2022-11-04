// This tool extends the default brush tool to allow for a threshold value to be set using hounsfield units with a low and high values. The threshold decides if the brush should paint the pixel or not.

import cornerstoneTools from "cornerstone-tools";
import cornerstone from "cornerstone-core";

const { drawBrushPixels, getCircle } = cornerstoneTools.import(
  "util/segmentationUtils"
);

const segmentationModule = cornerstoneTools.getModule("segmentation");
const BaseBrushTool = cornerstoneTools.import("base/BaseBrushTool");

/**
 * @public
 * @class ThresholdBrushTool
 * @memberof Tools.Brush
 * @classdesc Tool for drawing segmentations on an image.
 * @extends Tools.Base.BaseBrushTool
 */

export class ThresholdBrushTool extends BaseBrushTool {
  constructor(props = {}) {
    const defaultProps = {
      name: "ThresholdBrush",
      supportedInteractionTypes: ["Mouse"],
      configuration: {
        thresholdLow: 200,
        thresholdHigh: 1000,
      },
      mixins: ["renderBrushMixin"],
    };

    super(props, defaultProps);
  }

  /**
   * Paints the data to the labelmap if the mouse is down and the pixel is in the threshold low and high values range.
   * @protected
   * @param  {Object}
   * @returns {void}
   */
  _paint(evt) {
    const { configuration } = segmentationModule;
    const toolConfiguration = this.configuration;
    const eventData = evt.detail;
    const element = eventData.element;
    const { rows, columns } = eventData.image;
    const { x, y } = eventData.currentPoints.image;

    if (x < 0 || x > columns || y < 0 || y > rows) {
      return;
    }
    // check if the pixel is in the threshold range
    const radius = configuration.radius;
    const pointerArray = getCircle(radius, rows, columns, x, y);
    // loop over the pixels in the circle and eliminate any that are outside the threshold range
    const thresholdedPointerArray = pointerArray.filter((pointer) => {
      const storedPixel = cornerstone.getStoredPixels(
        element,
        pointer[0],
        pointer[1],
        1,
        1
      );
      const hounsfieldValue =
        storedPixel[0] * eventData.image.slope + eventData.image.intercept;
      return (
        hounsfieldValue >= toolConfiguration.thresholdLow &&
        hounsfieldValue <= toolConfiguration.thresholdHigh
      );
    });

    const { labelmap2D, labelmap3D, shouldErase } = this.paintEventData;

    // Draw / Erase the active color.
    drawBrushPixels(
      thresholdedPointerArray,
      labelmap2D.pixelData,
      labelmap3D.activeSegmentIndex,
      columns,
      shouldErase
    );
    cornerstone.updateImage(evt.detail.element);
  }
}
