"use client";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import cookies from "js-cookie";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import CustomButton from "@/app/components/CustomButton";
import { Server } from "../../Server";
import { toast } from "react-toastify";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "@/app/components/FormInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

export function InputOTPPattern({
  handleSend,
  sendType,
  setServerError,
  forgot = false,
  tfa,
}: {
  handleSend: (t: string) => void;
  sendType: string;
  setServerError: any;
  forgot?: boolean;
  tfa?: boolean;
}) {
  const otpSchema = z.object({
    code: z.string().min(6).max(6),
    password: !forgot
      ? z.string().optional()
      : z
          .string()
          .min(8, "Password must be at least 8 characters")
          .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
          .regex(/[0-9]/, "Password must contain at least one number")
          .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  });
  const form = useForm<z.infer<typeof otpSchema>>({ resolver: zodResolver(otpSchema) });
  const router = useRouter();
  const searchParams = useSearchParams();
  const onSubmit = async (data: z.infer<typeof otpSchema>) => {
    const res = await Server({
      method: "POST",
      resourceName: forgot ? "reset" : tfa ? "tfaValidate" : "validate",
      id: searchParams.get("uuid") || "",
      body: {
        send_type: sendType,
        send_by: sendType,
        code: data.code,
        uuid: searchParams.get("uuid"),
        username: searchParams.get("username"),
        type: searchParams.get("level"),
        password: forgot && data.password,
      },
    });
    console.log(res);
    if (!res.status) setServerError(res.message);
    if (res.status) {
      if (res.token) cookies.set("jwt", res.token);
      toast.success(res.message);
      const updatedParams = new URLSearchParams(searchParams.toString());
      ["username", "uuid", "level"].forEach((p) => updatedParams.delete(p));
      forgot ? router.push("/") : router.push("/login");
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vlidation code</FormLabel>
                <FormControl>
                  <InputOTP pattern={REGEXP_ONLY_DIGITS} maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      {<InputOTPSlot index={5} />}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>Please enter the one-time code sent to you.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {forgot && <FormInput name="password" control={form.control} placeholder="ENTER NEW PASSWORD" password />}
          <div className="mt-4 flex items-center gap-2">
            <CustomButton text="SEND CODE AGAIN" onClick={(e:any) => {
              e.preventDefault()
              handleSend(sendType)
            }} />
            <Button  className=" rounded-full px-8" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
