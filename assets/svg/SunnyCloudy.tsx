import * as React from "react"
import Svg, {
  G,
  Circle,
  Mask,
  Path,
  Defs,
  LinearGradient,
  Stop,
  SvgProps
} from "react-native-svg"

function SunnyCloudy(props: SvgProps) {
  return (
    <Svg
      width={185}
      height={171}
      viewBox="0 0 185 171"
      fill="none"
      {...props}
    >
      <G filter="url(#filter0_f_3_1616)">
        <Circle
          cx={91.1926}
          cy={49.7942}
          r={29.7942}
          fill="#FFC701"
          fillOpacity={0.5}
        />
      </G>
      <Circle
        cx={91.1928}
        cy={50.771}
        r={27.8173}
        fill="url(#paint0_linear_3_1616)"
        stroke="url(#paint1_linear_3_1616)"
        strokeWidth={2}
      />
      <Mask
        id="a"
        style={{
          maskType: "alpha"
        }}
        maskUnits="userSpaceOnUse"
        x={62}
        y={38}
        width={59}
        height={42}
      >
        <Path
          d="M120.01 50.771c0 15.915-12.902 28.817-28.817 28.817-15.915 0-28.817-12.902-28.817-28.817 0-15.915 10.703-12.21 26.619-12.21 15.915 0 31.015-3.705 31.015 12.21z"
          fill="url(#paint2_linear_3_1616)"
        />
      </Mask>
      <G filter="url(#filter1_f_3_1616)" mask="url(#a)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M135.152 103.521c0 11.6-9.404 21.003-21.003 21.003l-.244-.001v.001H40.152v-.001l-.244.001c-11.6 0-21.003-9.403-21.003-21.002 0-11.6 9.403-21.003 21.003-21.003 9.998 0 18.364 6.987 20.484 16.344l7.112-9.017 22.224-7.327h24.177v.001l.244-.001c11.599 0 21.003 9.403 21.003 21.002z"
          fill="#E18700"
        />
      </G>
      <G filter="url(#filter2_bd_3_1616)">
        <Mask id="b" fill="#fff">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M139.822 105.158l.177.001c8.382 0 15.178-6.796 15.178-15.178 0-8.383-6.796-15.178-15.178-15.178h-4.098c.142-1.04.215-2.1.215-3.177 0-12.867-10.431-23.297-23.297-23.297-12.867 0-23.297 10.43-23.297 23.297 0 1.214.093 2.406.272 3.57a15.224 15.224 0 00-3.449-.394c-8.382 0-15.178 6.796-15.178 15.179s6.796 15.178 15.178 15.178l.177-.001v.001h53.3v-.001z"
          />
        </Mask>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M139.822 105.158l.177.001c8.382 0 15.178-6.796 15.178-15.178 0-8.383-6.796-15.178-15.178-15.178h-4.098c.142-1.04.215-2.1.215-3.177 0-12.867-10.431-23.297-23.297-23.297-12.867 0-23.297 10.43-23.297 23.297 0 1.214.093 2.406.272 3.57a15.224 15.224 0 00-3.449-.394c-8.382 0-15.178 6.796-15.178 15.179s6.796 15.178 15.178 15.178l.177-.001v.001h53.3v-.001z"
          fill="url(#paint3_linear_3_1616)"
        />
        <Path
          d="M139.822 105.158l.023-2a1.999 1.999 0 00-2.023 2h2zm0-30.355h-2a2 2 0 002.023 2l-.023-2zm0 0h2a2 2 0 00-2-2v2zm-3.921 0l-1.982-.27a2 2 0 001.982 2.27v-2zm-46.107.393l-.453 1.948a2 2 0 002.43-2.252l-1.977.304zm-3.272 29.962l1.57 1.239a2.001 2.001 0 00-1.593-3.239l.023 2zm0 .001l-1.57-1.239a2.001 2.001 0 001.57 3.239v-2zm53.3 0v2a2 2 0 002-2h-2zm-.023 1.999l.2.001v-4l-.154-.001-.046 4zm.2.001c9.487 0 17.178-7.69 17.178-17.178h-4c0 7.278-5.9 13.178-13.178 13.178v4zm17.178-17.178c0-9.487-7.691-17.178-17.178-17.178v4c7.278 0 13.178 5.9 13.178 13.178h4zm-17.178-17.178h-.2l.046 4h.154v-4zm-2.177 2h4-4zm-1.921 2h3.921v-4h-3.921v4zm1.982-1.73a25.64 25.64 0 00.233-3.447h-4c0 .986-.067 1.957-.197 2.906l3.964.54zm.233-3.447c0-13.972-11.326-25.297-25.297-25.297v4c11.762 0 21.297 9.535 21.297 21.297h4zm-25.297-25.297c-13.971 0-25.297 11.325-25.297 25.297h4c0-11.763 9.535-21.297 21.297-21.297v-4zM87.522 71.626c0 1.316.1 2.61.295 3.874l3.954-.608a21.48 21.48 0 01-.249-3.266h-4zm2.724 1.622a17.22 17.22 0 00-3.9-.446v4c1.032 0 2.035.119 2.995.342l.906-3.896zm-3.9-.446c-9.488 0-17.179 7.691-17.179 17.179h4c0-7.278 5.9-13.178 13.178-13.178v-4zM69.166 89.981c0 9.487 7.691 17.178 17.178 17.178v-4c-7.278 0-13.178-5.9-13.178-13.178h-4zm17.178 17.178l.2-.001-.046-4-.154.001v4zm1.747-.761v-.001l-3.14-2.478v.001l3.14 2.478zm51.73-3.239h-53.3v4h53.3v-4zm-2 1.999v.001h4v-.001h-4z"
          fill="url(#paint4_linear_3_1616)"
          mask="url(#b)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_3_1616"
          x1={91.1928}
          y1={21.9536}
          x2={91.1928}
          y2={79.5883}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFE600" />
          <Stop offset={1} stopColor="#FF7A00" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_3_1616"
          x1={91.1928}
          y1={21.9536}
          x2={91.1928}
          y2={79.5883}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_3_1616"
          x1={91.1928}
          y1={21.9538}
          x2={91.1928}
          y2={79.5884}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFD600" />
          <Stop offset={1} stopColor="#FF7A00" />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_3_1616"
          x1={117.079}
          y1={50.0381}
          x2={117.079}
          y2={111.58}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="paint4_linear_3_1616"
          x1={113.172}
          y1={48.3286}
          x2={113.172}
          y2={105.159}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default SunnyCloudy
