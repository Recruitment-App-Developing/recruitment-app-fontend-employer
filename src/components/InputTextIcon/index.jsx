import cn from '../../utils/cn';

function InputTextIcon({
    inputId,
    leftIcon,
    className,
    classIcon,
    classInput,
    value,
    onChange,
    type = 'text',
    placeholder = '',
}) {
    return (
        <div
            className={cn('relative flex h-10 items-center bg-none', className)}
        >
            <input
                {...(inputId && { id: inputId })}
                className={cn(
                    `bg-bodyBg placeholder:text-gray-400 absolute w-full rounded-lg border-[1px]
                    border-solid border-transparent px-1 py-1 pl-10 leading-[30px] text-black
                    outline-none transition duration-500 ease-linear hover:bg-white
                    hover:shadow-outline-green hover:outline-none hover:outline-green
                    focus:border-success focus:bg-white focus:shadow-outline-green`,
                    classInput,
                )}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
            />
            {leftIcon && (
                <span
                    className={cn(
                        'flex-center absolute left-2 text-base',
                        classIcon,
                    )}
                >
                    {leftIcon}
                </span>
            )}
        </div>
    );
}

export default InputTextIcon;
