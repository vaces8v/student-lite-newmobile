import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function BookSvg(props: SvgProps) {
    return (
        <Svg
            width={34}
            height={34}
            viewBox="0 0 23 22"
            fill="none"
            stroke="#C1C1C1"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <Path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
        </Svg>
    )
}

export default BookSvg
