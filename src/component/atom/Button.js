const Button = (props) => {
    const { type, title, size, clicked, ...rest } = props;

    return (
        <button type={type} onClick={clicked}  {...rest}>
            {title}
        </button>
    );
}

export default Button;