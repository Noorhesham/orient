import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VerifiedIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const User = ({ user }: { user: { name: string; photo?: string } }) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={user.photo || ""} alt="@shadcn" />
        <AvatarFallback>{user.name}</AvatarFallback>
      </Avatar>
      <p>{user.name}</p>
      <VerifiedIcon/>
    </div>
  );
};

export default User;
