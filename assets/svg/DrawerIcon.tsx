import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const DrawerIconSvg = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#D9D9D9"
      strokeLinecap="round"
      strokeOpacity={0.7}
      strokeWidth={3}
      d="M2 22h20M2 12h20M2 2h20"
    />
  </Svg>
)
export default DrawerIconSvg