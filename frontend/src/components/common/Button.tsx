import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'danger' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, style, ...props }) => {
    let backgroundColor = '#007bff';
    if (variant === 'danger') backgroundColor = '#dc3545';
    if (variant === 'secondary') backgroundColor = '#6c757d';

    const baseStyle: React.CSSProperties = {
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        cursor: 'pointer',
        fontSize: '14px',
        margin: '0 5px',
        backgroundColor,
        ...style
    };

    return (
        <button style={baseStyle} {...props} />
    );
};
