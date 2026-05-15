import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import LeadsPage from "./pages/Leads";
import AIBrowserPage from "./pages/AIBrowser";
import ConnectorsPage from "./pages/Connectors";
import DashboardPage from "./pages/Dashboard";
import AdminPage from "./pages/Admin";
import FeaturesPage from "./pages/Features";
import PricingPage from "./pages/Pricing";
import DocsPage from "./pages/Docs";
import BlogPage from "./pages/Blog";
import ContactPage from "./pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/leads" component={LeadsPage} />
      <Route path="/ai-browser" component={AIBrowserPage} />
      <Route path="/connectors" component={ConnectorsPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/features" component={FeaturesPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/docs" component={DocsPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
