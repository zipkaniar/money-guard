import { Link } from 'react-router-dom';

function FormFooter({ type }) {
  const buttonClass =
    'w-[280px] rounded-full pb-[13px] pt-[13px] font-semibold text-base transition-all duration-300 shadow-md';

  if (type === 'login') {
    return (
      <div className="flex flex-col items-center gap-[20px]">
        <button
          type="submit"
          className={`${buttonClass} bg-gradient-to-r from-[#FFC727] via-[#9E40BA] to-[#7000FF] text-white hover:scale-105`}
        >
          LOG IN
        </button>
        <Link
  to="/register"
  className="text-center w-[280px] rounded-full bg-white text-[#4A56E2] pb-[13px] pt-[13px] no-underline custom-link"
>
  REGISTER
</Link>
      </div>
    );
  }

  if (type === 'register') {
    return (
      <div className="flex flex-col items-center gap-[20px]">
        <button
          type="submit"
          className={`${buttonClass} bg-gradient-to-r from-[#FFC727] via-[#9E40BA] to-[#7000FF] text-white hover:scale-105`}
        >
          REGISTER
        </button>
        <Link
  to="/login"
  className="w-[280px] h-[50px] flex justify-center items-center rounded-full bg-white text-[#4A56E2] font-semibold text-base transition-all duration-300 shadow-md hover:bg-gray-100 hover:scale-105"
>
  LOG IN
</Link>

      </div>
    );
  }

  return null;
}

export default FormFooter;
