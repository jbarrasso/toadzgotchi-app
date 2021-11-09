type Props = {
    text: string;
    display: string;
    flex: string;
    color: string;
    backgroundColor: string;
    margin: string;
    padding: string;
    border: string;
    borderRadius: string;
};

const Button = ({ text, display, flex, color, backgroundColor, margin, padding, border, borderRadius }: Props) => {
    return (
        <div style={{color: color,
                     display: display,
                     flex: flex,
                     backgroundColor: backgroundColor,
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

  