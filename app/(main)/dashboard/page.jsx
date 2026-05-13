"use client";

import { useEffect, useState } from "react";
import { Edit3, Loader2 } from "lucide-react";

import { getIndustryInsights } from "@/actions/dashboard";
import { getUserOnboardingStatus } from "@/actions/user";
import { Button } from "@/components/ui/button";
import DashboardView from "./_components/dashboard-view";
import OnboardingForm from "../onboarding/_components/onboarding-form";
import { industries } from "@/data/industries";

export default function IndustryInsightsPage() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const status = await getUserOnboardingStatus();
        setIsOnboarded(status.isOnboarded);

        if (status.isOnboarded) {
          const data = await getIndustryInsights();
          setInsights(data);
        } else {
          setShowForm(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center">
        <div className="surface-panel flex items-center gap-3 rounded-lg px-5 py-4 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          Loading insights...
        </div>
      </div>
    );
  }

  if (!isOnboarded || showForm) {
    return <OnboardingForm industries={industries} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="gradient-title text-4xl font-bold md:text-6xl">
            Industry Insights
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Track salary bands, market demand, and skills shaping your career path.
          </p>
        </div>

        <Button onClick={() => setShowForm(true)} variant="outline">
          <Edit3 className="h-4 w-4" />
          Update Profile
        </Button>
      </div>

      <DashboardView insights={insights} />
    </div>
  );
}
