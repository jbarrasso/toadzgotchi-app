type Props = {
    text: string;
    display: string;
    color: string;
    backgroundColor: string;
    width: string;
    margin: string;
    padding: string;
    border: string;
    borderRadius: string;
};

const Button = ({ text, display, color, backgroundColor, width, margin, padding, border, borderRadius }: Props) => {
    return (
        <div style={{color: color,
                     display: display,
                     backgroundColor: backgroundColor,
                     width: width,
                     margin: margin,
                     padding: padding,
                     border: border,
                     borderRadius: borderRadius
        }}>
        {text}       
        </div>
    );
};

export default Button

  