"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function UserMenu() {
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center gap-3 bg-white rounded-lg shadow-md px-4 py-2">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || "User"}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">
            {session.user.name}
          </span>
          <span className="text-xs text-gray-500">{session.user.email}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="ml-2 px-3 py-1 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
