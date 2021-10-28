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
    progressValue: number;
    progressMaxValue: number;
};

const ProgressBar = ({ text, display, color, backgroundColor, width, margin, padding, border, borderRadius, progressValue, progressMaxValue }: Props) => {
    return (
        <progress style={{color: color,
                     display: display,
                     backgroundColor: backgroundColor,
                     width: width,
                     margin: margin,
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

  