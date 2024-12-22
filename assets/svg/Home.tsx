import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const HomeSvg = (props: SvgProps) => (
  <Svg
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      stroke="#D9D9D9"
      strokeLinejoin="round"
      strokeOpacity={0.7}
      strokeWidth={2}
      d="M10.256 28.767H2.543C1.69 28.767 1 28.06 1 27.187V15.21c0-.418.163-.82.452-1.116l12.34-12.632a1.518 1.518 0 0 1 2.182 0l12.34 12.632c.29.296.453.698.453 1.116v11.978c0 .872-.691 1.579-1.543 1.579h-7.713m-9.255 0h9.255m-9.255 0v-9.474c0-.872.69-1.579 1.542-1.579h6.17c.852 0 1.543.707 1.543 1.58v9.473"
    />
  </Svg>
)
export default HomeSvg