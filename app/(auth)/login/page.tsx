import { LoginPageForm } from "./Form";
import { LoginPageImage } from "./image";

export default function LoginPage() {
  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-2">
      <LoginPageImage />
      <div className="h-full md:flex md:items-center md:justify-center">
        <LoginPageForm />
      </div>
    </div>
  );
}
