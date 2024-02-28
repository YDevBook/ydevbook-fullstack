const LoadingCard = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-full h-4 bg-gray-200 rounded-full animate-pulse" />
          <div className="w-full h-4 mt-2 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
      <div className="mt-4">
        <div className="w-full h-4 bg-gray-200 rounded-full animate-pulse" />
        <div className="w-full h-4 mt-2 bg-gray-200 rounded-full animate-pulse" />
        <div className="w-full h-4 mt-2 bg-gray-200 rounded-full animate-pulse" />
        <div className="w-full h-4 mt-2 bg-gray-200 rounded-full animate-pulse" />
        <div className="w-full h-4 mt-2 bg-gray-200 rounded-full animate-pulse" />
      </div>
    </div>
  );
};
export default LoadingCard;
