import dynamic from "next/dynamic";
import LoadingScreen from "@/components/ui/LoadingScreen";

// import RootLayout from '@/components/layout/RootLayout';
const RootLayout = dynamic(() => import("@/components/layout/RootLayout"), {
  ssr: false, // Set to true if you want to enable server-side rendering for this component
  loading: () => <LoadingScreen />,
});
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex">
        <RootLayout>
          <div className="p-4 lg:p-10">{children}</div>
        </RootLayout>
      </div>
    </>
  );
};

export default MainLayout;
