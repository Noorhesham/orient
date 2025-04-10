import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VerifiedIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const User = ({ user, user_did_buy }: { user: { name: string; avatar?: string }; user_did_buy: boolean }) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage className=" object-cover" src={user?.avatar} alt={user.name} />
        <AvatarFallback>{user.name}</AvatarFallback>
      </Avatar>
      <p>{user.name}</p>
      {user_did_buy && <VerifiedIcon />}
    </div>
  );
};

export default User;
