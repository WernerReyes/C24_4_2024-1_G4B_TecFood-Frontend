export const SpinnerMessage = () => {
  return (
    <div className="flex justify-center space-x-1 py-1">
      <span className="h-1 w-1 animate-bounce1 rounded-full bg-current"></span>
      <span className="h-1 w-1 animate-bounce2 rounded-full bg-current"></span>
      <span className="h-1 w-1 animate-bounce3 rounded-full bg-current"></span>
    </div>
  );
};
