import './Button.css';

const Button = ({className, value, onClick, src, id}) => {

    return (
        <button className={className} value={value} id={id} onClick={onClick}>
            <audio src={src} id={value}>
                
            </audio>
            {value}
        </button>
    );
};

export default Button;