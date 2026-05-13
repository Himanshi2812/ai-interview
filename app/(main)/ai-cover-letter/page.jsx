import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_components/cover-letter-list";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-title md:text-6xl">
            My Cover Letters
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Generate, review, and reuse tailored letters for each application.
          </p>
        </div>
        <Link href="/ai-cover-letter/new">
          <Button>
            <Plus className="h-4 w-4" />
            Create New
          </Button>
        </Link>
      </div>

      <CoverLetterList coverLetters={coverLetters} />
    </div>
  );
}
