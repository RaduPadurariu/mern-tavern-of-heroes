import { useRouteError, Link, isRouteErrorResponse } from "react-router";

const RootLayoutError = () => {
  const error = useRouteError();

  let message = "The tavern encountered an unexpected problem.";

  if (isRouteErrorResponse(error)) {
    message = error.statusText || "Something went wrong.";
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <main className="relative min-h-screen flex flex-col justify-between tavern-bg">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Centered error card */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4">
        <div className="bg-(--primary-color)/90 border border-(--light-color)/20 rounded-xl p-8 max-w-md w-full text-center shadow-2xl">
          <h1 className="text-3xl font-bold text-(--light-color) mb-3">
            Something went wrong
          </h1>

          <p className="text-(--light-color)/80 mb-6">{message}</p>

          <div className="flex justify-center gap-4">
            <Link
              to="/"
              className="bg-(--light-color) text-(--primary-color) px-5 py-2 rounded-lg font-semibold hover:opacity-80 transition"
            >
              Go Home
            </Link>

            <button
              onClick={() => location.reload()}
              className="border border-(--light-color) text-(--light-color) px-5 py-2 rounded-lg hover:bg-(--light-color)/10 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RootLayoutError;
