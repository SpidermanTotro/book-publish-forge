import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import Navigation from "./Navigation";
import Home from "./Home";
import Dashboard from "./Dashboard";
import MasterForgeModule from "./MasterForgeModule";

// Import core components that don't require extra dependencies
import AuditLog from "./AuditLog";
import EthicsReviewPanel from "./EthicsReviewPanel";
import ExportWizard from "./ExportWizard";
import AdminReviewPanel from "./AdminReviewPanel";
import ConsentTakedownCenter from "./ConsentTakedownCenter";
import LegalRegionBlocker from "./LegalRegionBlocker";
import RespectDashboard from "./RespectDashboard";
import EmpowermentDashboard from "./EmpowermentDashboard";

// AI Components (most are lightweight)
import AIHelperPanel from "./ai/AIHelperPanel";
import AIBeatSceneGeneratorPanel from "./ai/AIBeatSceneGeneratorPanel";
import CorrectionEnginePanel from "./ai/CorrectionEnginePanel";
import CompanionPanel from "./ai/CompanionPanel";

// Magazine Components
import MagazineDashboard from "./magazine/MagazineDashboard";
import PaparazziEthicsCheckPanel from "./magazine/PaparazziEthicsCheckPanel";

// Plugin Components
import PluginGalleryPanel from "./plugins/PluginGalleryPanel";
import PluginMarketPanel from "./plugins/PluginMarketPanel";

// Dashboard Components
import MultiProjectDashboard from "./dashboard/MultiProjectDashboard";
import CloudSyncPanel from "./dashboard/CloudSyncPanel";

// Other Components
import BoardOutlinePanel from "./outline/BoardOutlinePanel";
import TimelineVisualizerPanel from "./timeline/TimelineVisualizerPanel";
import StatsDashboardPanel from "./stats/StatsDashboardPanel";

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

// Placeholder for components requiring special dependencies
function ComingSoon({ feature }) {
  return (
    <PageWrapper title={feature}>
      <div style={{
        textAlign: "center",
        padding: "60px 20px",
        color: "#6b7280"
      }}>
        <div style={{ fontSize: "4em", marginBottom: 20 }}>🚧</div>
        <h2 style={{ color: "#4c1d95" }}>Coming Soon</h2>
        <p style={{ fontSize: "1.1em" }}>
          This feature requires additional dependencies and will be available after installation.
        </p>
        <p style={{ fontSize: "0.9em", marginTop: 20 }}>
          Run <code style={{ background: "#f3f4f6", padding: "4px 8px", borderRadius: 4 }}>
            npm install
          </code> in the web directory to enable all features.
        </p>
      </div>
    </PageWrapper>
  );
}

function SimplifiedApp() {
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
                <Route path="/ai/plot-consistency" element={<ComingSoon feature="AI Plot Consistency" />} />
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
                <Route path="/ai/inline" element={<ComingSoon feature="Inline AI Suggestions" />} />
                
                {/* Collaboration - requires yjs */}
                <Route path="/collab/team" element={<ComingSoon feature="Team Collaborators" />} />
                <Route path="/collab/chat" element={<ComingSoon feature="Writing Room Chat" />} />
                <Route path="/collab/revisions" element={<ComingSoon feature="Revision History" />} />
                
                {/* Export & Publishing */}
                <Route path="/export" element={
                  <PageWrapper title="Export Wizard">
                    <ExportWizard />
                  </PageWrapper>
                } />
                <Route path="/export/panel" element={<ComingSoon feature="Export Panel" />} />
                <Route path="/export/cloud" element={<ComingSoon feature="Export to Cloud" />} />
                
                {/* Magazine Tools */}
                <Route path="/magazine" element={
                  <PageWrapper title="Magazine Dashboard">
                    <MagazineDashboard />
                  </PageWrapper>
                } />
                <Route path="/magazine/proof" element={<ComingSoon feature="Proof Finder" />} />
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
                <Route path="/plugins/wizard" element={<ComingSoon feature="Plugin Creation Wizard" />} />
                
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
                <Route path="/world" element={<ComingSoon feature="World Builder" />} />
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

export default SimplifiedApp;
