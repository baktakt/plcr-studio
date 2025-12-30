"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-red-600">
            Access Denied
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {error === "AccessDenied"
              ? "Your email address is not authorized to access this application."
              : "An error occurred during authentication."}
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <p className="text-sm text-gray-700 text-center">
            Please contact the administrator if you believe this is an error.
          </p>
          <Link
            href="/auth/signin"
            className="w-full flex justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}
