# react-native-unlock

[WIP]

## Feature

- Smooth gesture base on ReactART
- Simple & Advanced usage
- Fully customized ability

## Changelogs

## Show Cases

WIP

## Getting Started

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Components](#components)
- [Properties](#properties)
- [Examples](#examples)
- [Development](#development)

### Installation

```sh
$ npm i react-native -g
$ react-native init examples
$ cd examples
$ npm i react-native-unlock -S
```

Note: this component base on `ART.xcodeproj`, we should manual linking it with few steps:

![](https://cloud.githubusercontent.com/assets/533360/20092343/9e1dcef6-a5d2-11e6-9ad1-53e7ed7558ae.png)

1. Open your project in Xcode

    ```sh
    $ open ios/examples.xcodeproj
    ```

2. Drag `ART.xcodeproj`(in `node_modules/react-native/Libraries/ART/`) over to `Libraries` section in XCode

3. Add `libART.a` under "Build Phases" -> "Link Binary With Libraries"

That's all, then restart the simulator.

### Basic Usage

```jsx
import React from 'react'
import { AppRegistry, View } from 'react-native'
import Unlock from 'react-native-unlock'
AppRegistry.registerComponent('examples', () => () => <View style={{flex: 1}}>
  <Unlock />
</View>)
```

### Components

```jsx
import Unlock, { Circle, Line, Text, Group } from 'react-native-unlock'
```

Expose `Circle`, `Line`, `Text`, `Group` for more custom ability.

### Properties

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| width | undefind | `number` | if unset autoLayout base on outer size. |
| height | undefiend | `number` | if unset autoLayout base on outer size. |
| gapSize | true | `number` | gap size between outer circle. |
| stroke | true | `string` | gap size between outer circle. |
| font | true | `string` | gap size between outer circle. |
| style | true | `object` | wrapper style will overrer the default. |
| autoResetTimeout | true | `number` | only auto reset if set. |
| clear | true | `bool` | clear current state, usefully if you want reset through state. |
| outer | true | `element` | Provide your cumstom outer component. |
| outerProps | true | `object` | cumstom outer component. |
| outerOverProps | true | `object` | cumstom outer component. |
| outerErrorProps | true | `object` | cumstom outer component. |
| outerSuccessProps | true | `object` | cumstom outer component. |
| inner | true | `element` | Provide your cumstom inner component. |
| innerProps | true | `object` | cumstom inner component. |
| innerOverProps | true | `object` | cumstom inner component. |
| innerErrorProps | true | `object` | cumstom inner component. |
| innerSuccessProps | true | `object` | cumstom inner component. |
| onRelease | true | `func` | onPanResponderRelease handle. |
| onGrant | true | `func` | onPanResponderGrant handle. |
| line | true | `object` | line style . |
| lineSuccess | true | `object` | line style for success. |
| lineError | true | `object` | line style for error. |
| interactive | true | oneOf(['', 'READY', 'SUCCESS', 'ERROR']) | interactive state. |
| showTail | true | bool | whether show tail line. |
| showText | true | bool | whether show inner text. |
| maxLength | true | number | the max length of password. |
| mode | true | oneOf(['gesture', 'touch']) | show mode. |

### Examples

- Unlock mode

- Setting mode

- Touch mode (like iOS native)

### Development

```sh
$ cd examples
$ npm i
$ npm run dev
$ react-native run-ios
```
