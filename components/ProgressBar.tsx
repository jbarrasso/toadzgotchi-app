type Props = {
    text: string;
    display: string;
    flex: string;
    color: string;
    backgroundColor: string;
    margin: string;
    width: string;
    padding: string;
    border: string;
    borderRadius: string;
    progressValue: number;
    progressMaxValue: number;
};

const ProgressBar = ({ text, display, flex, color, backgroundColor,  margin, width, padding, border, borderRadius, progressValue, progressMaxValue }: Props) => {
    return (
        <progress style={{color: color,
                     display: display,
                     flex: flex,
                     backgroundColor: backgroundColor,
                     margin: margin,
                     width: width,
                     padding: padding,
                     border: border,
                     borderRadius: borderRadius }}
        value={progressValue}
        max={progressMaxValue}
        >       
        </progress>
    );
};

export default ProgressBar

  