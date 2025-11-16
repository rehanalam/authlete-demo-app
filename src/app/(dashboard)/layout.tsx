import { Header } from "@/components/dashboard/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" w-full flex flex-col items-center gap-12">
      <Header title="Rehan Org" />

      {children}
    </div>
  );
}
