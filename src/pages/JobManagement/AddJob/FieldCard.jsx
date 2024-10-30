export default function FieldCard({ children, title, icon }) {
    return (
        <div className="flex-center gap-6 rounded-md border border-gray-200 bg-white px-6 py-4 shadow-lg">
            <table className="w-full">
                <tr>
                    <td className="w-1">
                        <div
                            className="mr-4 flex w-max items-center justify-center rounded-[50%] bg-gray-200 p-2
                                text-lg"
                        >
                            {icon}
                        </div>
                    </td>
                    <td className="flex items-start">
                        <h3 className="text-base font-semibold">{title}</h3>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <div className="w-full pt-2">{children}</div>
                    </td>
                </tr>
            </table>
        </div>
    );
}
