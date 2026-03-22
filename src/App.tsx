/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import CenterTopology from './components/CenterTopology';
import RightSidebar from './components/RightSidebar';

export default function App() {
  return (
    <div className="p-4 flex flex-col gap-4 h-screen overflow-hidden text-[#e6f1ff] font-sans relative">
      <div className="relative z-50">
        <Header />
      </div>
      <main className="flex-1 flex justify-between gap-4 min-h-0 relative z-10 pointer-events-none">
        <div className="relative z-10 flex flex-col justify-end gap-4 shrink-0 pointer-events-auto">
          <LeftSidebar />
        </div>
        <CenterTopology />
        <div className="relative z-10 flex flex-col gap-4 shrink-0 pointer-events-auto ml-auto">
          <RightSidebar />
        </div>
      </main>
    </div>
  );
}
