import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {

  return (

    <div className="min-h-screen bg-gray-100">

      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-4 md:p-8 w-full overflow-x-hidden">

          {children}

        </main>

      </div>

    </div>
  );
}

export default MainLayout;