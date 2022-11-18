export const PaymentFailed = ({ setPage, page }) => {
  return (
    <div className="bg-white">
      <div className="bg-white p-6  md:mx-auto">
        <div id="icon" className="flex justify-center">
          <svg width="79" height="79" viewBox="0 0 79 79" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M39.5003 0C61.3161 0 79 17.6845 79 39.4997C79 61.3149 61.3161 78.9994 39.5003 78.9994C17.6845 79 0 61.3155 0 39.4997C0 17.6839 17.6845 0 39.5003 0ZM47.2223 25.1705C48.9903 23.3749 51.8647 23.3672 53.6424 25.1532C55.4194 26.9379 55.4265 29.8413 53.6597 31.6356L45.9037 39.5035L53.6675 47.3785C55.422 49.1594 55.3962 52.0441 53.616 53.8218C51.8332 55.5994 48.9678 55.5949 47.2159 53.8134L39.5042 45.9937L31.7777 53.8295C30.0097 55.6251 27.1359 55.6328 25.3576 53.8468C23.5813 52.0621 23.5729 49.1581 25.3403 47.3637L33.0969 39.4965L25.3325 31.6215C23.5787 29.8413 23.6038 26.9565 25.3853 25.1782C27.1674 23.4006 30.0328 23.4051 31.7841 25.1866L39.4971 33.0076L47.2223 25.1705Z"
              fill="#FF4141"
            />
          </svg>
        </div>

        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            ¡A ocurrido un error!
          </h3>
          <p>
            Por favor intente nuevamente realizar su método de pago.
          </p>
          <div className="py-10 text-center">
            <button
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              onClick={() => {
                setPage(page - 1);
              }}
            >
              Regresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
