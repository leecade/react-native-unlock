/**
 * react-native-unlock
 * @author leecade<leecade@163.com>
 */
import React from 'react'
import { ART } from 'react-native'
const { Shape } = ART

export default ({
  d,
  stroke = '#000',
  strokeWidth = 1,
  ...props
}) => <Shape d={d} stroke={stroke} strokeWidth={strokeWidth} {...props} />
