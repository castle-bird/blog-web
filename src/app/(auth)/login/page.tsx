import {Button} from "@/components/ui/button";
import SubTitle from "@/components/layout/SubTitle";
import {EyeOffIcon} from "lucide-react";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {Field, FieldLabel} from "@/components/ui/field";
import Logo from "@/components/layout/logo";
import {Separator} from "@/components/ui/separator";


const LoginPage = () => {
  return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 ">
        <div
            className="w-full max-w-md rounded-4xl pl-4 pr-4 pt-12 pb-12 sm:p-10 bg-[linear-gradient(to_right,--theme(--color-foreground/6%)_1px,transparent_1px),linear-gradient(to_bottom,--theme(--color-foreground/6%)_1px,transparent_1px)] bg-size-[24px_24px]"
        >
        <div className="w-full space-y-8 border bg-card p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)]">
          <div className="space-y-1 text-center">
            <h1>
              <Logo/>
            </h1>
            <SubTitle textContent="Login"/>
          </div>

          <form id="loginForm" className="space-y-5">
            <Field>
              <FieldLabel className="sr-only" htmlFor="email">이메일</FieldLabel>
              <InputGroup className="rounded-none">
                <InputGroupInput
                    id="email"
                    type="text"
                    placeholder="Email..."
                />
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel className="sr-only" htmlFor="password">비밀번호</FieldLabel>
              <InputGroup className="rounded-none">
                <InputGroupInput
                    id="password"
                    type="password"
                    placeholder="Password..."
                />
                <InputGroupAddon align="inline-end">
                  <EyeOffIcon className="size-4 text-muted-foreground"/>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Button type="submit" className="rounded-none w-full cursor-pointer" size="lg">
              로그인
            </Button>
          </form>
        </div>
        </div>
      </div>
  );
};

export default LoginPage;
