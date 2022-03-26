type Props = {
    text: string;
    img: string;
    position: string;
    display: string;
    flex: string;
    color: string;
    backgroundColor: string;
    fontfamily: string;
    margin: string;
    padding: string;
    top: string;
    left: string;
    height: string;
    width: string;
    border: string;
    borderRadius: string;
    cursor: string;
    onClick: (event: React.MouseEvent<HTMLElement>) => void
};

const Button = ({ text, img, position, display, flex, color, backgroundColor, fontfamily, top, left, height, width, margin, padding, border, borderRadius, cursor, onClick }: Props) => {
    // if (text=keyword) {
    //call hook to execute keyword logic (each keyword has diff logic)
    //return value for ProgressBar component
    //}
    return (
        <div style={{
            color: color,
            display: display,
            position: position,
            flex: flex,
            backgroundColor: backgroundColor,
            fontFamily: fontfamily,
            top: top,
            left: left,
            height: height,
            width: width,
            margin: margin,
            padding: padding,
            border: border,
            borderRadius: borderRadius,
            cursor: cursor
        }}
        onClick={onClick}>
            <img src={img} style={{position:'absolute', border: '2px solid green', top:'', left:'', width:'100%', height:'100%'}}/>
            {text}
        </div>
    );
};

export default Button

  