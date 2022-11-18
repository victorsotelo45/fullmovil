const Summary = ({ page, setPage, formData, setFormData }) => {
    const handleProductClick = () => {
      setPage(page - 1);
    };
    const handleSubTypeClick = () => {
      console.log("clicked");
      setPage(page - 2);
    };
  
    return (
      <div>
        <p className="font-semibold text-sm text-gray-700 divide-y">Proveedor</p>
        <div
          className="flex items-center space-x-4 cursor-pointer shadow hover:shadow-md active:shadow-sm border border-slate-100 rounded"
          onClick={() => handleSubTypeClick()}
        >
          <div className="flex-shrink-0">
            <img
              className="w-8 h-8 rounded-full"
              src={formData.subTypeImageUrl}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-medium text-gray-900 truncate dark:text-white"
              alt={formData.subTypeDescription}
            >
              {formData.subTypeDescription}
            </p>
          </div>
          <p className="block text-sm font-medium text-gray-900">Editar</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
        <div
          className="flex items-center space-x-4 cursor-pointer shadow hover:shadow-md active:shadow-sm border border-slate-100 rounded mt-3"
          onClick={() => handleProductClick()}
        >
          <div className="flex-1 min-w-0">
            <p className="block font-semibold text-sm text-gray-700">
              Producto:{" "}
            </p>
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {formData.productDescription}
            </p>
          </div>
          <div className="inline-flex items-center text-sm font-medium text-gray-900">
            ${formData.productValue}
          </div>
          <p className="block text-sm font-medium text-gray-900">Editar</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    );
  };
  
  export default Summary;
  