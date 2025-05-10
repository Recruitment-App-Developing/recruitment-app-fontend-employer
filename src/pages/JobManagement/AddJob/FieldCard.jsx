export default function FieldCard({ children, title, icon }) {
    return (
        <div className="flex-center border-gray-200 gap-6 rounded-md border bg-white px-6 py-4 shadow-lg">
            <table className="w-full">
                <tbody>
                    <tr>
                        <td className="w-1">
                            <div
                                className="bg-gray-200 mr-4 flex w-max items-center justify-center rounded-[50%] p-2
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
                </tbody>
            </table>
        </div>
    );
}
