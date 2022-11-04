# cornerstonetools-thresholdbrush

A threshold brush that draws pixels only within the specified threshold low and high range.<br>

![ezgif com-gif-maker](https://user-images.githubusercontent.com/93064150/199975179-66cf6f78-a769-4c45-8bf0-aaab450cb6e1.gif)

Notice how it only draws on the bone which is in a threshold range of 200 to 100. and If I attempt to draw on other pixels outside of that range, nothing gets drawn.


## Dependencies 

* [cornerstone-core](https://github.com/cornerstonejs/cornerstone)
* [cornerstone-tools](https://github.com/cornerstonejs/cornerstoneTools)

## Demo

[LIVE DEMONSTRATION](https://google.com)

## Installation

```sh
$ npm i cornerstonetools-thresholdbrush
```

## Example

```js
import ThresholdBrush from "cornerstonetools-thresholdbrush";

cornerstoneTools.addToolForElement(element, ThresholdBrush, {configuration: {thresholdLow: 200 , thresholdHigh: 1000}});
cornerstoneTools.setToolActive("ThresholdBrush", { mouseButtonMask: 1 });

```

You can modify the threshold low an threshold high configuration on the fly like the following

```js

let brushThreshold = cornerstoneTools.store.state.tools.filter(tool => tool.name == 'ThresholdBrush')[0].configuration
brushThreshold.thresholdLow = -29
brushThreshold.thresholdHigh = 150

```


## LICENSE

MIT
