import { Outlet } from "react-router-dom"
import TabRail from "./TabRail"
import Header from "./Header"

export default function Layout() {
  return (
    <div className="kotoba-root" style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <TabRail />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Header />
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
