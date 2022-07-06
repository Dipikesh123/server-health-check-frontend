import react from 'react';
import PropTypes from "prop-types";

const Input = ({ id,change,label, value,type, name, placeholder, ...rest }) => {
    
    return(
        <div>
            {label ? (

                    <div>
                        <label>
                            {label}
                        </label>
                    </div>
                )
                : (
                    ""
                )}

            <input onChange={change} type={type} placeholder={placeholder} id={id} value = {value} {...rest}></input>
        
        </div>

        

    )
}

Input.prototype = {
  change: PropTypes.func,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  // value:PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default Input;