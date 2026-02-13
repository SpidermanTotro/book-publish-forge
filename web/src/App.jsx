import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import MasterForgeModule from "./components/MasterForgeModule";

// Import additional components
import AuditLog from "./components/AuditLog";
import EthicsReviewPanel from "./components/EthicsReviewPanel";
import ExportWizard from "./components/ExportWizard";
import AdminReviewPanel from "./components/AdminReviewPanel";
import ConsentTakedownCenter from "./components/ConsentTakedownCenter";
import LegalRegionBlocker from "./components/LegalRegionBlocker";
import RespectDashboard from "./components/RespectDashboard";
import EmpowermentDashboard from "./components/EmpowermentDashboard";

// AI Components
import AIHelperPanel from "./components/ai/AIHelperPanel";
import AIBeatSceneGeneratorPanel from "./components/ai/AIBeatSceneGeneratorPanel";
import AIPlotConsistencyAgent from "./components/ai/AIPlotConsistencyAgent";
import CorrectionEnginePanel from "./components/ai/CorrectionEnginePanel";
import CompanionPanel from "./components/ai/CompanionPanel";
import InlineAISuggestPanel from "./components/ai/InlineAISuggestPanel";

// Collaboration Components
import CollaboratorsPanel from "./components/collab/CollaboratorsPanel";
import WritingRoomChatPanel from "./components/collab/WritingRoomChatPanel";
import RevisionHistoryPanel from "./components/collab/RevisionHistoryPanel";

// Export Components
import ExportPanel from "./components/export/ExportPanel";
import ExportToCloudPanel from "./components/cloud/ExportToCloudPanel";

// Magazine Components
import MagazineDashboard from "./components/magazine/MagazineDashboard";
import ProofFinderPanel from "./components/magazine/ProofFinderPanel";
import PaparazziEthicsCheckPanel from "./components/magazine/PaparazziEthicsCheckPanel";

// Plugin Components
import PluginGalleryPanel from "./components/plugins/PluginGalleryPanel";
import PluginMarketPanel from "./components/plugins/PluginMarketPanel";
import PluginWizardPanel from "./components/plugins/PluginWizardPanel";

// Dashboard Components
import MultiProjectDashboard from "./components/dashboard/MultiProjectDashboard";
import CloudSyncPanel from "./components/dashboard/CloudSyncPanel";

// Other Components
import BoardOutlinePanel from "./components/outline/BoardOutlinePanel";
import TimelineVisualizerPanel from "./components/timeline/TimelineVisualizerPanel";
import WorldGraphPanel from "./components/world/WorldGraphPanel";
import StatsDashboardPanel from "./components/stats/StatsDashboardPanel";

// Wrapper for standalone components
function PageWrapper({ children, title }) {
  return (
    <div style={{
      background: "linear-gradient(120deg,#f3ecfa,#e9e3f2 60%,#fbeeff)",
      minHeight: "100vh",
      padding: "40px 20px"
    }}>
      <div style={{
        maxWidth: 920,
        margin: "0 auto",
        background: "#fff",
        borderRadius: 16,
        padding: 32,
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
      }}>
        {title && <h1 style={{ marginTop: 0, color: "#4c1d95" }}>{title}</h1>}
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div style={{ minHeight: "100vh" }}>
          <Routes>
            {/* Home route - no navigation */}
            <Route path="/" element={<Home />} />
          
          {/* All other routes include navigation */}
          <Route path="*" element={
            <>
              <Navigation />
              <Routes>
                {/* Dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Main Forge Pages */}
                <Route path="/book" element={<MasterForgeModule />} />
                <Route path="/erotic" element={<MasterForgeModule />} />
                
                {/* Ethics & Compliance */}
                <Route path="/ethics" element={
                  <PageWrapper title="Ethics Review">
                    <EthicsReviewPanel content="" onProceed={() => alert("Ethics approved!")} />
                  </PageWrapper>
                } />
                <Route path="/audit" element={
                  <PageWrapper title="Audit Log">
                    <AuditLog initialEntries={[]} />
                  </PageWrapper>
                } />
                <Route path="/consent" element={
                  <PageWrapper title="Consent & Takedown Center">
                    <ConsentTakedownCenter />
                  </PageWrapper>
                } />
                <Route path="/admin-review" element={
                  <PageWrapper title="Admin Review Panel">
                    <AdminReviewPanel />
                  </PageWrapper>
                } />
                <Route path="/legal" element={
                  <PageWrapper title="Legal Region Compliance">
                    <LegalRegionBlocker />
                  </PageWrapper>
                } />
                <Route path="/respect" element={
                  <PageWrapper title="Respect Dashboard">
                    <RespectDashboard />
                  </PageWrapper>
                } />
                <Route path="/empowerment" element={
                  <PageWrapper title="Empowerment Dashboard">
                    <EmpowermentDashboard />
                  </PageWrapper>
                } />
                
                {/* AI Tools */}
                <Route path="/ai/helper" element={
                  <PageWrapper title="AI Writing Assistant">
                    <AIHelperPanel />
                  </PageWrapper>
                } />
                <Route path="/ai/beat-generator" element={
                  <PageWrapper title="AI Beat & Scene Generator">
                    <AIBeatSceneGeneratorPanel />
                  </PageWrapper>
                } />
                <Route path="/ai/plot-consistency" element={
                  <PageWrapper title="AI Plot Consistency">
                    <AIPlotConsistencyAgent />
                  </PageWrapper>
                } />
                <Route path="/ai/corrections" element={
                  <PageWrapper title="Correction Engine">
                    <CorrectionEnginePanel />
                  </PageWrapper>
                } />
                <Route path="/ai/companion" element={
                  <PageWrapper title="AI Writing Companion">
                    <CompanionPanel />
                  </PageWrapper>
                } />
                <Route path="/ai/inline" element={
                  <PageWrapper title="Inline AI Suggestions">
                    <InlineAISuggestPanel />
                  </PageWrapper>
                } />
                
                {/* Collaboration */}
                <Route path="/collab/team" element={
                  <PageWrapper title="Team Collaborators">
                    <CollaboratorsPanel />
                  </PageWrapper>
                } />
                <Route path="/collab/chat" element={
                  <PageWrapper title="Writing Room Chat">
                    <WritingRoomChatPanel />
                  </PageWrapper>
                } />
                <Route path="/collab/revisions" element={
                  <PageWrapper title="Revision History">
                    <RevisionHistoryPanel />
                  </PageWrapper>
                } />
                
                {/* Export & Publishing */}
                <Route path="/export" element={
                  <PageWrapper title="Export Wizard">
                    <ExportWizard />
                  </PageWrapper>
                } />
                <Route path="/export/panel" element={
                  <PageWrapper title="Export Panel">
                    <ExportPanel />
                  </PageWrapper>
                } />
                <Route path="/export/cloud" element={
                  <PageWrapper title="Export to Cloud">
                    <ExportToCloudPanel />
                  </PageWrapper>
                } />
                
                {/* Magazine Tools */}
                <Route path="/magazine" element={
                  <PageWrapper title="Magazine Dashboard">
                    <MagazineDashboard />
                  </PageWrapper>
                } />
                <Route path="/magazine/proof" element={
                  <PageWrapper title="Proof Finder">
                    <ProofFinderPanel />
                  </PageWrapper>
                } />
                <Route path="/magazine/ethics" element={
                  <PageWrapper title="Paparazzi Ethics Check">
                    <PaparazziEthicsCheckPanel />
                  </PageWrapper>
                } />
                
                {/* Plugins */}
                <Route path="/plugins/gallery" element={
                  <PageWrapper title="Plugin Gallery">
                    <PluginGalleryPanel />
                  </PageWrapper>
                } />
                <Route path="/plugins/market" element={
                  <PageWrapper title="Plugin Market">
                    <PluginMarketPanel />
                  </PageWrapper>
                } />
                <Route path="/plugins/wizard" element={
                  <PageWrapper title="Plugin Creation Wizard">
                    <PluginWizardPanel />
                  </PageWrapper>
                } />
                
                {/* Project Management */}
                <Route path="/projects" element={
                  <PageWrapper title="Multi-Project Dashboard">
                    <MultiProjectDashboard />
                  </PageWrapper>
                } />
                <Route path="/cloud" element={
                  <PageWrapper title="Cloud Sync">
                    <CloudSyncPanel />
                  </PageWrapper>
                } />
                
                {/* Writing Tools */}
                <Route path="/outline" element={
                  <PageWrapper title="Story Outline Board">
                    <BoardOutlinePanel />
                  </PageWrapper>
                } />
                <Route path="/timeline" element={
                  <PageWrapper title="Timeline Visualizer">
                    <TimelineVisualizerPanel />
                  </PageWrapper>
                } />
                <Route path="/world" element={
                  <PageWrapper title="World Builder">
                    <WorldGraphPanel />
                  </PageWrapper>
                } />
                <Route path="/stats" element={
                  <PageWrapper title="Writing Statistics">
                    <StatsDashboardPanel />
                  </PageWrapper>
                } />
              </Routes>
            </>
          } />
        </Routes>
      </div>
    </Router>
    </ErrorBoundary>
  );
}

export default App;
