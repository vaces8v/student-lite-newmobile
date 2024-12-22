import * as React from "react"
import Svg, {Path, SvgProps} from "react-native-svg"

function CloudySVG(props: SvgProps) {
    return (
        <Svg
            width="50px"
            height="50px"
            viewBox="0 0 1024 1024"
            className="icon"
            {...props}
        >
            <Path
                d="M249.303 454.01a259.45 259.45 0 10518.902 0 259.45 259.45 0 10-518.902 0z"
                fill="#FA870B"
            />
            <Path
                d="M287.252 830.618v-.031l-3.43.03c-110.336 0-199.987-87.756-201.871-196.71l-.031-3.502c0-110.571 90.399-200.212 201.902-200.212 101.714 0 185.866 74.588 199.864 171.602h4.424v-1.332c0-125.85 101.847-228.096 228.26-230.133l3.84-.031c128.194.01 232.11 103.055 232.11 230.175 0 127.119-103.916 230.154-232.11 230.154l2.58-.03v.03H287.263z"
                fill="#DFF1FB"
            />
        </Svg>
    )
}

export default CloudySVG