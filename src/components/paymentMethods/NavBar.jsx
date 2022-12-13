import { useNavigate } from "react-router-dom";

export const NavBar = ({ name, propsButton, page, setPage }) => {
  const navigate = useNavigate();
  return (
    <nav className="px-5 py-2">
      <ul className="flex">
        <li className="flex items-center content-center">
          <button
            onClick={() => {
              page == 0 ?  navigate(-1): 
              setPage(page - 1);
            }}
          >
            <svg
              width="29"
              height="15"
              viewBox="0 0 29 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.939338 10.9393C0.353552 11.5251 0.353551 12.4749 0.939338 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.80761 11.0711 0.80761 10.4853 1.3934L0.939338 10.9393ZM29 10.5L2 10.5L2 13.5L29 13.5L29 10.5Z"
                fill="black"
              />
            </svg>
          </button>
        </li>
        <li className="grow flex justify-center items-center customFont">
          {name}
        </li>
        <li className="flex items-center content-center">
          {
            propsButton
          }
        </li>
      </ul>
    </nav>
  );
};
