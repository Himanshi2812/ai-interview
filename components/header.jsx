// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "./ui/button";
// import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, StarsIcon } from "lucide-react";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
// import { checkUser } from "@/lib/checkUser";

// const Header = async() => {
//     await checkUser();
//     return (
//         <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
//             <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
//                 <Link href="/">
//                     <Image src="/logo.png" alt="HireMind Logo" width={200} height={60} 
//                     className= "h-12 py-1 w-auto object-contain"/>
//                 </Link>
           
//             <div className="flex items-center space-x-2 md:space-x-4">
//                 <SignedIn>
//                     <Link href={'/dashboard'}>
//                     <Button variant= "outline">
//                         <LayoutDashboard className="h-4 w-4"/>
//                         Industry Insights

//                     </Button>
//                     </Link>
                

//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button>
//                         <StarsIcon className="h-4 w-4"/>
//                         <span className="hidden md:block">Growth Tools</span>
//                         <ChevronDown className="h-4 w-4" />
//                     </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent>
//                         <DropdownMenuItem>
//                             <Link href={"/resume"} className="flex items-center gap-2">
//                             <FileText className="h-4 w-4" />
//                             <span>Build Resume</span>
//                             </Link>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem>
//                             <Link href={"/ai-cover-letter"} className="flex items-center gap-2">
//                             <PenBox className="h-4 w-4" />
//                             <span>Cover Letter</span>
//                             </Link>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem>
//                             <Link href={"/interview"} className="flex items-center gap-2">
//                             <GraduationCap className="h-4 w-4" />
//                             <span>Interview Prep</span>
//                             </Link>
//                         </DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//                 </SignedIn>

//                 <SignedOut>
//                     <SignInButton>
//                         <Button variant="outline">Sign In</Button>
//                     </SignInButton>
//                 </SignedOut>
//                 <SignedIn>
//                     <UserButton 
//                     appearance={{
//                         elements:{
//                             avatarBox: "w-10 h-10",
//                             userButtonPopoverCard: "shadow-xl",
//                             userPreviewMainIdentifier: "font-semibold",
//                         },
//                         }}
//                         afterSignOutUrl="/"
//                         />
//                 </SignedIn>
//             </div>
//         </nav>
//         </header>
//     )
// }

// export default Header
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, Sparkles, Video } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#07110f]/88 shadow-[0_12px_35px_rgba(0,0,0,0.22)] backdrop-blur-xl supports-[backdrop-filter]:bg-[#07110f]/76">
      <nav className="container mx-auto flex h-[4.5rem] items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="HireMind Logo"
            width={200}
            height={60}
            className="h-11 w-auto object-contain"
          />
        </Link>

        {/* Right side menu */}
        <div className="flex items-center gap-2 md:gap-3">

          <SignedIn>
            <Link href={"/dashboard"}>
              <Button variant="outline" className="hidden sm:inline-flex">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden lg:inline">Industry Insights</span>
                <span className="lg:hidden">Insights</span>
              </Button>
            </Link>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Sparkles className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">

                <DropdownMenuItem>
                  <Link href={"/resume"} className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Build Resume</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link href={"/ai-cover-letter"} className="flex items-center gap-2">
                    <PenBox className="h-4 w-4" />
                    <span>Cover Letter</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link href={"/interview"} className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>Interview Prep</span>
                  </Link>
                </DropdownMenuItem>

                {/* NEW VIDEO INTERVIEW PAGE */}
                <DropdownMenuItem>
                  <Link href={"/interview/video"} className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    <span>Video Interview</span>
                  </Link>
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          {/* Signed Out */}
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>

          {/* User Profile */}
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>

        </div>
      </nav>
    </header>
  );
};

export default Header;
