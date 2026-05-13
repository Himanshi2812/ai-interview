// "use client";

// import { useState, useEffect } from "react";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { generateQuiz, saveQuizResult } from "@/actions/interview";
// import QuizResult from "./quiz-result";
// import useFetch from "@/hooks/use-fetch";
// import { BarLoader } from "react-spinners";

// export default function Quiz() {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [showExplanation, setShowExplanation] = useState(false);

//   const {
//     loading: generatingQuiz,
//     fn: generateQuizFn,
//     data: quizData,
//   } = useFetch(generateQuiz);

//   const {
//     loading: savingResult,
//     fn: saveQuizResultFn,
//     data: resultData,
//     setData: setResultData,
//   } = useFetch(saveQuizResult);

//   useEffect(() => {
//     if (quizData) {
//       setAnswers(new Array(quizData.length).fill(null));
//     }
//   }, [quizData]);

//   const handleAnswer = (answer) => {
//     const newAnswers = [...answers];
//     newAnswers[currentQuestion] = answer;
//     setAnswers(newAnswers);
//   };

//   const handleNext = () => {
//     if (currentQuestion < quizData.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       setShowExplanation(false);
//     } else {
//       finishQuiz();
//     }
//   };

//   const calculateScore = () => {
//     let correct = 0;
//     answers.forEach((answer, index) => {
//       if (answer === quizData[index].correctAnswer) {
//         correct++;
//       }
//     });
//     return (correct / quizData.length) * 100;
//   };

//   const finishQuiz = async () => {
//     const score = calculateScore();
//     try {
//       await saveQuizResultFn(quizData, answers, score);
//       toast.success("Quiz completed!");
//     } catch (error) {
//       toast.error(error.message || "Failed to save quiz results");
//     }
//   };

//   const startNewQuiz = () => {
//     setCurrentQuestion(0);
//     setAnswers([]);
//     setShowExplanation(false);
//     generateQuizFn();
//     setResultData(null);
//   };

//   if (generatingQuiz) {
//     return <BarLoader className="mt-4" width={"100%"} color="gray" />;
//   }

//   // Show results if quiz is completed
//   if (resultData) {
//     return (
//       <div className="mx-2">
//         <QuizResult result={resultData} onStartNew={startNewQuiz} />
//       </div>
//     );
//   }

//   if (!quizData) {
//     return (
//       <Card className="mx-2">
//         <CardHeader>
//           <CardTitle>Ready to test your knowledge?</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-muted-foreground">
//             This quiz contains 10 questions specific to your industry and
//             skills. Take your time and choose the best answer for each question.
//           </p>
//         </CardContent>
//         <CardFooter>
//           <Button onClick={generateQuizFn} className="w-full">
//             Start Quiz
//           </Button>
//         </CardFooter>
//       </Card>
//     );
//   }

//   const question = quizData[currentQuestion];

//   return (
//     <Card className="mx-2">
//       <CardHeader>
//         <CardTitle>
//           Question {currentQuestion + 1} of {quizData.length}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <p className="text-lg font-medium">{question.question}</p>
//         <RadioGroup
//           onValueChange={handleAnswer}
//           value={answers[currentQuestion]}
//           className="space-y-2"
//         >
//           {question.options.map((option, index) => (
//             <div key={index} className="flex items-center space-x-2">
//               <RadioGroupItem value={option} id={`option-${index}`} />
//               <Label htmlFor={`option-${index}`}>{option}</Label>
//             </div>
//           ))}
//         </RadioGroup>

//         {showExplanation && (
//           <div className="mt-4 p-4 bg-muted rounded-lg">
//             <p className="font-medium">Explanation:</p>
//             <p className="text-muted-foreground">{question.explanation}</p>
//           </div>
//         )}
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         {!showExplanation && (
//           <Button
//             onClick={() => setShowExplanation(true)}
//             variant="outline"
//             disabled={!answers[currentQuestion]}
//           >
//             Show Explanation
//           </Button>
//         )}
//         <Button
//           onClick={handleNext}
//           disabled={!answers[currentQuestion] || savingResult}
//           className="ml-auto"
//         >
//           {savingResult && (
//             <BarLoader className="mt-4" width={"100%"} color="gray" />
//           )}
//           {currentQuestion < quizData.length - 1
//             ? "Next Question"
//             : "Finish Quiz"}
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import QuizResult from "./quiz-result";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { Square, Volume2 } from "lucide-react";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  // 🔊 Speech State
  const [isSpeaking, setIsSpeaking] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  // 🔊 Toggle Speech
  const handleSpeechToggle = (text) => {
    if (!window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const speech = new SpeechSynthesisUtterance(text);

      speech.lang = "en-US";
      speech.rate = 0.9;
      speech.pitch = 1;

      speech.onend = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(speech);
      setIsSpeaking(true);
    }
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    // Stop voice on next
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correct = 0;

    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });

    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();

    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz completed!");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results");
    }
  };

  const startNewQuiz = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);

    generateQuizFn();
    setResultData(null);
  };

  if (generatingQuiz) {
    return <BarLoader className="mt-4" width={"100%"} color="gray" />;
  }

  // Show results
  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  // Start screen
  if (!quizData) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Ready to test your knowledge?</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground">
            This quiz contains questions specific to your industry and skills.
            Take your time and choose the best answer.
          </p>
        </CardContent>

        <CardFooter>
          <Button onClick={generateQuizFn} className="w-full">
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Question */}
        <p className="text-lg font-medium">{question.question}</p>

        <Button
          onClick={() => handleSpeechToggle(question.question)}
          variant="outline"
          size="sm"
          className="mb-3"
        >
          {isSpeaking ? (
            <>
              <Square className="h-4 w-4" />
              Stop
            </>
          ) : (
            <>
              <Volume2 className="h-4 w-4" />
              Listen
            </>
          )}
        </Button>

        {/* Options */}
        <RadioGroup
          onValueChange={handleAnswer}
          value={answers[currentQuestion]}
          className="space-y-2"
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center gap-3 rounded-lg border border-border/70 bg-card/45 p-3 transition-colors hover:bg-accent">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>

        {/* Explanation */}
        {showExplanation && (
          <div className="mt-4 rounded-lg border border-border/70 bg-muted/70 p-4">
            <p className="font-medium">Explanation:</p>
            <p className="text-muted-foreground">{question.explanation}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        {!showExplanation && (
          <Button
            onClick={() => setShowExplanation(true)}
            variant="outline"
            disabled={!answers[currentQuestion]}
          >
            Show Explanation
          </Button>
        )}

        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || savingResult}
          className="ml-auto"
        >
          {savingResult && (
            <BarLoader className="mt-4" width={"100%"} color="gray" />
          )}

          {currentQuestion < quizData.length - 1
            ? "Next Question"
            : "Finish Quiz"}
        </Button>
      </CardFooter>
    </Card>
  );
}
