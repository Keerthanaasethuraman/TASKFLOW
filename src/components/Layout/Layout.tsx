import "./Layout.css";
import Sidebar from "../Sidebar/Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Sidebar />

      <main className="content">
        {children}
      </main>
    </div>
  );
}

export default Layout;