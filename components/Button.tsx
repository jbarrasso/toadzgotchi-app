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
    cursor: string;
    onClick: (event: React.MouseEvent<HTMLElement>) => void
};

const Button = ({ text, display, flex, color, backgroundColor, margin, padding, border, borderRadius, cursor, onClick }: Props) => {
    // if (text=keyword) {
    //call hook to execute keyword logic (each keyword has diff logic)
    //return value for ProgressBar component
    //}
    return (
        <div style={{color: color,
                     display: display,
                     flex: flex,
                     backgroundColor: backgroundColor,
                     margin: margin,
                     padding: padding,
                     border: border,
                     borderRadius: borderRadius,
                     cursor: cursor
        }}
        onClick={onClick}
        >
        {text}       
        </div>
        
    );
};

export default Button

  