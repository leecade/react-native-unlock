/**
 * react-native-unlock
 * @author leecade<leecade@163.com>
 */
import React, { Children, cloneElement } from 'react'
import { ART } from 'react-native'
const {
  Shape,
  Path,
  Group
} = ART

const Circle = ({
    radius = 0,
    stroke = '#000',
    fill = '#000',
    strokeWidth = 0,
    x = 0,
    y = 0,
    children,
    ...props
  }) => {
  const path = new Path()
    .moveTo(radius + strokeWidth / 2, strokeWidth / 2)
    .arc(0, radius * 2, radius / 2)
    .arc(0, -radius * 2, radius / 2)
    .close()

  const childrenWithProps = children && Children.map(children, child => {
    return child && cloneElement(child, {
      x: x + strokeWidth / 2 - (child.props.strokeWidth || 0) / 2 + (child.props.x || 0),
      y: y + strokeWidth / 2 - (child.props.strokeWidth || 0) / 2 + (child.props.y || 0)
    })
  })

  return (<Group>
    <Shape
      x={x - radius}
      y={y - radius}
      d={path}
      stroke={stroke}
      fill={fill}
      strokeWidth={strokeWidth}
      {...props} />
    {childrenWithProps}
  </Group>)
}

export default Circle
