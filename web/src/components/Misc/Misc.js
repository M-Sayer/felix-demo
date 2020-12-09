import React from 'react';
import '../../styles/ButtonStyles.css'

const Button = ({className , ...props}) => {
    return <button className={['Button btn', className].join(' ')} {...props}/>
}

export {
    Button,
}