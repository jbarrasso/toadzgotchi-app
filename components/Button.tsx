type Props = {
    text: string;
    img: string;
    position: string;
    display: string;
    alignItems: string;
    flex: string;
    color: string;
    backgroundColor: string;
    fontfamily: string;
    marginLeft: string;
    marginRight: string;
    margin: string;
    padding: string;
    top: string;
    left: string;
    height: string;
    width: string;
    zIndex: number;
    border: string;
    borderRadius: string;
    cursor: string;
    onClick: (event: React.MouseEvent<HTMLElement>) => void
};

const Button = ({ text, img, position, display, alignItems, flex, color, backgroundColor, fontfamily, top, left, height, width, zIndex, marginLeft, marginRight, margin, padding, border, borderRadius, cursor, onClick }: Props) => {
    // if (text=keyword) {
    //call hook to execute keyword logic (each keyword has diff logic)
    //return value for ProgressBar component
    //}
    return (
        <div style={{
            color: color,
            display: display,
            alignItems: alignItems,
            position: position,
            flex: flex,
            backgroundColor: backgroundColor,
            fontFamily: fontfamily,
            top: top,
            left: left,
            height: height,
            width: width,
            zIndex: zIndex,
            marginLeft: marginLeft,
            marginRight: marginRight,
            margin: margin,
            padding: padding,
            border: border,
            borderRadius: borderRadius,
            cursor: cursor }}
            onClick={onClick}>
            
            {img != '' && <img src={img} style={{position:'absolute', border: '', top:'0', left:'0', width:'100%', height:'100%'}}/> }
            {text}
        </div>
    );
};

export default Button

  