import EmployerRegisterForm from './EmployerRegisterForm';

export default function EmployerRegister() {
    return (
        <section className="bg-gray-50 flex h-screen w-screen items-center justify-center pb-10 pt-10">
            <div className="bg-gray-100 flex h-fit w-3/4 flex-row gap-20 rounded-2xl p-5 shadow-lg">
                <div className="w-[600px]">
                    <h2 className="mb-2 text-left text-xl font-semibold leading-7 text-primary">
                        Chào mừng bạn đã quay trở lại
                    </h2>
                    <h3 className="pb-6 leading-5">
                        Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm
                        công nghệ tuyển dụng ứng dụng sâu AI & Hiring Funnel
                    </h3>
                    <EmployerRegisterForm />
                    <div
                        className="mt-3 w-[600px] border-t-2 border-t-stone-200 pt-3 text-sm leading-5
                            text-[#6f7882]"
                    >
                        <p className="text-center font-bold text-black">
                            Bạn gặp khó khăn khi tạo tài khoản?
                        </p>
                        <p className="text-center">
                            Vui lòng gọi tới số{' '}
                            <a
                                href="#"
                                className="font-bold leading-5 text-green"
                            >
                                (024) 6680 5588
                            </a>{' '}
                            (giờ hành chính).
                        </p>
                    </div>
                </div>
                <div
                    className="relative flex h-[700px] w-full grow flex-row gap-0 rounded-2xl
                        bg-[url('https://static.topcv.vn/v4/image/auth/auth_bg_desktop.png')] shadow-lg"
                >
                    <div className="container justify-center">
                        <div className="container absolute left-9 top-[50%] w-3/5 translate-y-[-50%]">
                            <a href="#">
                                <img
                                    src="https://static.topcv.vn/v4/image/auth/topcv_white.png"
                                    alt="logo"
                                />
                            </a>
                            <h1 className="mt-4 text-4xl font-bold text-white">
                                Tiếp lợi thế
                                <br />
                                Nối thành công
                            </h1>
                            <p className="text-sm font-normal leading-6 text-white">
                                TopCV - Hệ sinh thái nhân sự tiên phong ứng dụng
                                công nghệ tại Việt Nam
                            </p>
                        </div>
                    </div>
                    <div className="bg-auth-arrow w-2/5"></div>
                </div>
            </div>
        </section>
    );
}
