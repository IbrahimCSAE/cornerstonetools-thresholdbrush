


const imageIds = [
    "wadouri:https://ibrahimcsae.github.io/cornerstonetools-thresholdbrush/data/case2a_001.dcm",
    "wadouri:https://ibrahimcsae.github.io/cornerstonetools-thresholdbrush/data/case2a_002.dcm",
    "wadouri:https://ibrahimcsae.github.io/cornerstonetools-thresholdbrush/data/case2a_003.dcm",
  ]
  
  function _init() {
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone
  
    const config = {
      webWorkerPath: `https://tools.cornerstonejs.org/examples/assets/image-loader/cornerstoneWADOImageLoaderWebWorker.js`,
      taskConfiguration: {
        decodeTask: {
          codecsPath: `https://tools.cornerstonejs.org/examples/assets/image-loader/cornerstoneWADOImageLoaderCodecs.js`,
        },
      },
    }
    cornerstoneWADOImageLoader.webWorkerManager.initialize(config)
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath
    cornerstoneTools.external.cornerstone = cornerstone
    cornerstoneTools.external.Hammer = Hammer
    const segModule = cornerstoneTools.getModule("segmentation")
    segModule.configuration.fillAlpha = 0.5
    segModule.configuration.fillAlphaInactive = 0
    segModule.configuration.renderOutline = false
    cornerstoneTools.init({
      showSVGCursors: true,
    })
  
    cornerstoneTools.toolStyle.setToolWidth(2)
    cornerstoneTools.toolColors.setToolColor("rgb(255, 255, 0)")
    cornerstoneTools.toolColors.setActiveColor("rgb(0, 255, 0)")
    cornerstoneTools.store.state.touchProximity = 40
  }
  

  const display = async (element, imageIds) => {
    cornerstone.enable(element)
    const image = await cornerstone.loadAndCacheImage(imageIds[0])
    cornerstone.displayImage(element, image)
    cornerstoneTools.addStackStateManager(element, [
      "stack",
    ])
    cornerstoneTools.addToolState(element, "stack", {
      imageIds: [...imageIds],
      currentImageIdIndex: 0,
    })
    cornerstoneTools.addToolForElement(
      element,
      cornerstoneTools["StackScrollMouseWheelTool"],
    )
    cornerstoneTools.setToolActive("StackScrollMouseWheel", {
      mouseButtonMask: 0,
    })
    cornerstoneTools.addToolForElement(element, ThresholdBrush)
    cornerstoneTools.setToolActiveForElement(element, "ThresholdBrush", { configuration: {thresholdLow: 200, thresholdHigh: 1000} })
    return Promise.all(
      imageIds.map((imageId) => cornerstone.loadAndCacheImage(imageId)),
    )
  }
  
  
  ;(async function () {
    _init()
    const axial = document.querySelector("#axial")
    const images = await display(axial, imageIds)
    console.log(images)
  })()