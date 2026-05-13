"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/app/lib/schema";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import useFetch from "@/hooks/use-fetch";
import { updateUser } from "@/actions/user";

import { toast } from "sonner";
import { Loader2, UserRoundCheck } from "lucide-react";

export default function OnboardingForm({ industries }) {

  const router = useRouter();

  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const [redirectLoading, setRedirectLoading] = useState(false);

  const {
    loading,
    fn: updateUserFn,
    data: result,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const watchIndustry = watch("industry");

  const onSubmit = async (values) => {

    const formattedIndustry =
      values.subIndustry || values.industry;

    setRedirectLoading(true);

    await updateUserFn({
      ...values,
      industry: formattedIndustry,
    });
  };

  useEffect(() => {

    if (result?.success) {

      toast.success("Profile saved!");

      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1500);
    }

  }, [result, router]);

  return (
    <>
      {/* FULL SCREEN LOADER */}
      {(loading || redirectLoading) && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm">

          <Loader2 className="h-14 w-14 animate-spin text-primary" />

          <p className="mt-4 text-lg font-medium">
            Setting up your profile...
          </p>

        </div>
      )}

      <div className="flex min-h-[72vh] items-center justify-center px-4">

        <Card className="w-full max-w-xl">

          <CardHeader className="text-center">

            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UserRoundCheck className="h-6 w-6" />
            </div>

            <CardTitle className="text-3xl font-bold">
              Complete Profile
            </CardTitle>

            <CardDescription>
              Personalize insights and interview prep around your goals.
            </CardDescription>

          </CardHeader>

          <CardContent>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >

              {/* Industry */}
              <div className="space-y-2">

                <Label>Industry</Label>

                <select
                  className="h-10 w-full rounded-lg border border-input bg-secondary/65 px-3.5 py-2 text-sm shadow-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/25"
                  {...register("industry")}
                  onChange={(e) => {

                    const value = e.target.value;

                    setValue("industry", value);

                    const selected = industries.find(
                      (i) => i.id === value
                    );

                    setSelectedIndustry(selected);

                    setValue("subIndustry", "");
                  }}
                >

                  <option value="">
                    Select Industry
                  </option>

                  {industries.map((ind) => (
                    <option
                      key={ind.id}
                      value={ind.id}
                    >
                      {ind.name}
                    </option>
                  ))}

                </select>

                {errors.industry && (
                  <p className="text-red-500 text-sm">
                    {errors.industry.message}
                  </p>
                )}

              </div>

              {/* Specialization */}
              {watchIndustry && selectedIndustry && (

                <div className="space-y-2">

                  <Label>Specialization</Label>

                  <select
                    className="h-10 w-full rounded-lg border border-input bg-secondary/65 px-3.5 py-2 text-sm shadow-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/25"
                    {...register("subIndustry")}
                  >

                    <option value="">
                      Select specialization
                    </option>

                    {selectedIndustry.subIndustries.map((s) => (
                      <option
                        key={s}
                        value={s}
                      >
                        {s}
                      </option>
                    ))}

                  </select>

                </div>
              )}

              {/* Experience */}
              <div className="space-y-2">

                <Label>Experience</Label>

                <Input
                  type="number"
                  min="0"
                  {...register("experience")}
                />

              </div>

              {/* Skills */}
              <div className="space-y-2">

                <Label>Skills</Label>

                <Input
                  placeholder="React, Node, AI..."
                  {...register("skills")}
                />

              </div>

              {/* Bio */}
              <div className="space-y-2">

                <Label>Bio</Label>

                <Textarea
                  rows={4}
                  {...register("bio")}
                />

              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading || redirectLoading}
              >

                {loading || redirectLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Profile...
                  </>
                ) : (
                  "Save Profile"
                )}

              </Button>

            </form>

          </CardContent>

        </Card>

      </div>
    </>
  );
}