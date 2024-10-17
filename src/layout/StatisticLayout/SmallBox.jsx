import clsx from 'clsx';

export default function SmallBox({ title, number, className }) {
    return (
        <div className={clsx('w-[250px] bg-white p-3', className)}>
            <h3 className="text-sm font-medium">{title}</h3>
            <h2 className="text-lg font-bold">{number}</h2>
        </div>
    );
}
